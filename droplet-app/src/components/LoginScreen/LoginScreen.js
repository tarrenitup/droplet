import React, {Component} from 'react'
//import {withRouter} from 'react-router'
import './LoginScreen.css'
import Auth from '../Auth/Auth.js'

class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.login = this.login.bind(this);
    }

    onChange(event){
        //event.target.name returns name from <input>
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault();
        this.login(this.state.username, this.state.password);
    }


    login(username,password){
        console.log("Login");
        console.log("User:", username);
        console.log("Pass:", password);
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
            if(res.status == 200){
                return res.json();
            }
            else{
                return Promise.reject(res.status);
            }
        })
        .then(function(json){
            console.log(JSON.stringify(json.token));
            Auth.setCookie('token', json.token, 1);
            console.log(Auth.parseJwt(Auth.getCookie('token')).sub);
            //window.location.assign('/');
            console.log(Auth.isAuthenticated());
        }).catch((error)=>{
            console.log(error);
            window.location.reload();
        });
    }

    render() {
      return (
          <main className="login-screen screen" >
                <div className="modal">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-text"
                            placeholder="Username"
                            name="username"
                            type="text"
                            onChange={this.onChange}
                        />
                        <input
                            className="form-text"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.onChange}
                        />
                        <input
                            className="submitLogin"
                            value="Login"
                            type="submit"
                            onClick={this.onSubmit}
                        />
                    </form>
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

export default LoginScreen;
