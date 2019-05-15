import React, {Component} from 'react'
import './LoginScreen.scss'
import Auth from '../Auth/Auth.js'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {loadLoginData} from '../../actions/loginActions'
import {updateLocation} from '../../actions/miscActions'

class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            success:null
        }
        this.login = this.login.bind(this);
    }

    handleSubmit(event,dispatch){
        event.preventDefault();
        const user = this.getUsernameInput.value;
        const pass = this.getPasswordInput.value;
        this.login(user, pass ,dispatch);
    }

    login(username,password,dispatch){
        //console.log("Login");
        //console.log("User:", username);
        //console.log("Pass:", password);
        fetch('http://localhost:5000/users/signin',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(function(res){
            if(res.status === 200){
                return res.json();
            }
            else{
                this.setState({
                    success:false
                })
                return Promise.reject(res.status);
            }
        }.bind(this))
        .then(function(json){
            Auth.setCookie('token', json.token, 1);
            const name = Auth.parseJwt(Auth.getCookie('token')).name;
            const uid = Auth.parseJwt(Auth.getCookie('token')).sub;
            dispatch(loadLoginData(name,uid));
            if(navigator.geolocation){
                navigator.geolocation.watchPosition((pos) =>{
                    let location = [pos.coords.longitude, pos.coords.latitude];
                    dispatch(updateLocation(location));
                })
            }
            this.setState({
                success:true
            });
        }.bind(this))
        .catch((error)=>{
            return error;
        });
    }

    failedMessage = () => {
        if(this.state.success === false){
            return <span className="login_failed">Login Failed! Invalid username or password.</span>
        }
    }

    redirection = () => {
        if(this.state.success === true){
            return <Redirect to='/' />
        }
    }

    render() {
      return (
          <main className="login-screen screen" >
                {this.redirection()}
                <div className="login-modal">
                    <h1>login</h1>
                    <form onSubmit={(e) => this.handleSubmit(e,this.props.dispatch)}>
                        <input
                            className="login-form-text"
                            placeholder="username"
                            name="username"
                            type="text"
                            ref={(input) => this.getUsernameInput = input}
                            required
                        />
                        <input
                            className="login-form-text"
                            placeholder="password"
                            name="password"
                            type="password"
                            ref={(input) => this.getPasswordInput = input}
                            required
                        />
                        <input
                            className="submitLogin"
                            value="login"
                            type="submit"
                        />
                    </form>
                    {this.failedMessage()}
                    <div className = "link">
                        New user?&nbsp;
                        <a href="http://localhost:3000/signup">click here</a>
                        &nbsp;to sign up.
                    </div>
                </div>
          </main>

      );
    }
}

export default connect()(withRouter(LoginScreen));
