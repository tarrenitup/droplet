import React, { Component } from 'react'
import './Test.css'

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
                </form>
            </main>
        )
    }
}

export default Test
