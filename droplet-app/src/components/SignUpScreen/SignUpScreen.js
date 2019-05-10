import React, {Component} from 'react'
import {Redirect} from 'react-router'
import './SignUpScreen.css'
import Auth from '../Auth/Auth.js'
import {connect} from 'react-redux'
import {loginSuccess} from '../../actions/loginActions'
import {loadHomePosts} from '../../actions/postActions'

class SignUpScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            cpassword:'',
            bio:'',
            success:null
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signup = this.signup.bind(this);
    }

    onChange(event){
        //event.target.name returns name from <input>
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event,dispatch){
        event.preventDefault();
        this.signup(this.state.username, this.state.password, this.state.cpassword, this.state.bio,dispatch);
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
                dispatch(loginSuccess(name));
                dispatch(loadHomePosts())
                .then(function(){
                    this.setState({
                        success:1
                    });
                }.bind(this));
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
                            onChange={this.onChange}
                            required
                        />
                        <input
                            className="signup-form-text"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.onChange}
                            required
                        />
                        <input
                            className="signup-form-text"
                            placeholder="Confirm Password"
                            name="cpassword"
                            type="password"
                            onChange={this.onChange}
                            required
                        />
                        <textarea
                            className="signup-form-textarea"
                            placeholder="Your Bio"
                            name="bio"
                            onChange={this.onChange}
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
