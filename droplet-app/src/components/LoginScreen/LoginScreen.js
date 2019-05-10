import React, {Component} from 'react'
import './LoginScreen.css'
import Auth from '../Auth/Auth.js'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {loginSuccess} from '../../actions/loginActions'
import {loadHomePosts} from '../../actions/postActions'

class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            success:null
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }

    onChange(event){
        //event.target.name returns name from <input>
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event,dispatch){
        event.preventDefault();
        this.login(this.state.username, this.state.password,dispatch);
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
            dispatch(loginSuccess(name));
            dispatch(loadHomePosts())
            .then(function(){
                this.setState({
                    success:true
                });
            }.bind(this));
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
                    <h1>Login</h1>
                    <form onSubmit={(e) => this.handleSubmit(e,this.props.dispatch)}>
                        <input
                            className="login-form-text"
                            placeholder="Username"
                            name="username"
                            type="text"
                            onChange={this.onChange}
                            required
                        />
                        <input
                            className="login-form-text"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.onChange}
                            required
                        />
                        <input
                            className="submitLogin"
                            value="Login"
                            type="submit"
                        />
                    </form>
                    {this.failedMessage()}
                    <div className = "link">
                        New user?&nbsp;
                        <a href="http://localhost:3000/signup">Click here</a>
                        &nbsp;to sign up.
                    </div>
                </div>
          </main>

      );
    }
}

export default connect()(withRouter(LoginScreen));
