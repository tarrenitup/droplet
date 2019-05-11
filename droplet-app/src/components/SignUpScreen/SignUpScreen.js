import React, {Component} from 'react'
import {Redirect} from 'react-router'
import './SignUpScreen.css'
import Auth from '../Auth/Auth.js'
import {connect} from 'react-redux'
import {loadLoginData} from '../../actions/loginActions'

class SignUpScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            success:null
        }
        this.signup = this.signup.bind(this);
    }


    handleSubmit(event,dispatch){
        event.preventDefault();
        const user = this.getUsernameInput.value;
        const pass = this.getPassInput.value;
        const cpass = this.getCPassInput.value;
        const bio = this.getBioInput.value
        this.signup(user,pass,cpass,bio,dispatch);
    }


    signup(username,password,cpass, bio,dispatch){
        if(password===cpass){
            fetch('http://localhost:5000/users/',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    bio: bio
                })
            })
            .then(function(res){
                if(res.status===200){
                    return res.json();
                }
                else{
                    this.setState({
                        success:3
                    })
                }
            }.bind(this))
            .then(function(json){
                Auth.setCookie('token', json.token, 1);
                const name = Auth.parseJwt(Auth.getCookie('token')).name;
                const uid = Auth.parseJwt(Auth.getCookie('token')).sub;
                dispatch(loadLoginData(name,uid))
                this.setState({
                    success:1
                });
            }.bind(this))
            .catch((error)=>{
                return error;
            });
        }
        else{
            //Password didn't match confirmed password
            this.setState({
                success:2
            })
        }
    }

    failedMessage = () => {
        if(this.state.success === 2){
            return <span className="signup_failed">Signup Failed! Passwords did not match.</span>
        }
        else if(this.state.success === 3){
            return <span className="signup_failed">Signup Failed! Username taken.</span>
        }
    }

    redirection = () => {
        if(this.state.success === 1){
            return <Redirect to='/' />
        }
    }

    render() {
      return (
          <main className="signup-screen screen" >
                {this.redirection()}
                <div className="signup-modal">
                    <h1>Sign Up</h1>
                    <form onSubmit={(e) => this.handleSubmit(e,this.props.dispatch)}>
                        <input
                            className="signup-form-text"
                            placeholder="Username"
                            name="username"
                            type="text"
                            ref={(input) => this.getUsernameInput = input}
                            required
                        />
                        <input
                            className="signup-form-text"
                            placeholder="Password"
                            name="password"
                            type="password"
                            ref={(input) => this.getPassInput = input}
                            required
                        />
                        <input
                            className="signup-form-text"
                            placeholder="Confirm Password"
                            name="cpassword"
                            type="password"
                            ref={(input) => this.getCPassInput = input}
                            required
                        />
                        <textarea
                            className="signup-form-textarea"
                            placeholder="Your Bio"
                            name="bio"
                            ref={(input) => this.getBioInput = input}
                        />
                        <input
                            className="submitRegister"
                            value="Sign Up"
                            type="submit"
                        />
                        {this.failedMessage()}
                        <div className = "link">
                            Already a user?&nbsp;
                            <a href="http://localhost:3000/login">Click here</a>
                            &nbsp;to login.
                        </div>
                    </form>
                </div>
          </main>

      );
    }
}

export default connect()(SignUpScreen);
