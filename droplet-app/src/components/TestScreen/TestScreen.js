import React, { Component } from 'react'
import Auth from '../Auth/Auth.js'

class Test extends Component {
    constructor(){
        super();
        this.state = {
            messages: [],
        }
        this.onGetUserPosts = this.onGetUserPosts.bind(this);
    }

    onGetLocation(event) {
        event.preventDefault();
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position);
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
            })
        }
    }

    onGetID(event){
        event.preventDefault();
        console.log(Auth.getCookie('token'));
        //need to check if cookie is alive
        console.log(Auth.parseJwt(Auth.getCookie('token')).sub);
    }

    onGetUserPosts(event){
        event.preventDefault();
        const fetchURL = 'http://localhost:5000/users/' + Auth.parseJwt(Auth.getCookie('token')).sub;
        console.log(fetchURL);
        fetch(fetchURL)
            .then(results => {
                return results.json()
            }).then(data =>{
                this.setState({
                    messages: data.message,
                })
            })
        console.log(this.state.messages);
    }
    render(){
        return(
            <main className="test-screen">
            <form>
                <input
                    className="getLocation"
                    value="Get Location"
                    type="submit"
                    onClick={this.onGetLocation}
                />
                <input
                    className="getUserID"
                    value="Get User ID"
                    type="submit"
                    onClick={this.onGetID}
                />
                <input
                    className="getUserPosts"
                    value="Get User Posts"
                    type="submit"
                    onClick={this.onGetUserPosts}
                />
                </form>
            </main>
        )
    }
}

export default Test