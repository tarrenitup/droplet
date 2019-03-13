import React, { Component } from 'react'
import './Test.css'
import Auth from '../Auth/Auth.js'

class Test extends Component{
    constructor(){
        super();
    }

    onGetLocation(event){
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
        console.log(Auth.parseJwt(Auth.getCookie('token')).sub);
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
                </form>
            </main>
        )
    }
}

export default Test