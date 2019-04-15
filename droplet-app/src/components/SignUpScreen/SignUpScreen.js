import React, {Component} from 'react'
import {withRouter} from 'react-router'
import './SignUpScreen.css'
//import Auth from '../Auth/Auth.js'

class SignUpScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            cpassword:'',
            bio:''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
//        this.login = this.login.bind(this);
    }

    onChange(event){
        //event.target.name returns name from <input>
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault();
        this.signup(this.state.username, this.state.password, this.state.cpassword, this.state.bio);
    }


    signup(username,password,cpass, bio){
        if(password==cpass){
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
                return res.json();
            })
            .then(function(json){
                console.log(JSON.stringify(json));
            });
            this.props.history.push('/');
            //window.location.assign('/');
        }
        else{
            window.location.reload();
        }
    }

    render() {
      return (
          <main className="signup-screen screen" >
                <div className="modal">
                    <h1>Sign Up</h1>
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
                            className="form-text"
                            placeholder="Confirm Password"
                            name="cpassword"
                            type="password"
                            onChange={this.onChange}
                        />
                        <input
                            className="form-text"
                            placeholder="Your Bio"
                            name="bio"
                            type="text"
                            onChange={this.onChange}
                        />
                        <input
                            className="submitRegister"
                            value="Sign Up"
                            type="submit"
                            onClick={this.onSubmit}
                        />
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

export default SignUpScreen;
