import React, { Component } from 'react'
import './Test.css'
import Auth from '../Auth/Auth.js'

class Test extends Component{
    constructor(){
        super();
        this.state = {
            messageIDs: [],
            posttext: '',
            location: []
        }
        this.onGetLocation = this.onGetLocation.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPost = this.onPost.bind(this);
        this.onGetUserPosts = this.onGetUserPosts.bind(this);
        this.onGetUserPostsContent = this.onGetUserPostsContent.bind(this);

    } 

    onChange(event){
        //event.target.name returns name from <input>
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onGetLocation(event){
        event.preventDefault();
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position);
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                this.setState({
                    location: [position.coords.longitude,
                        position.coords.latitude]
                })
            })
        }
    }

    onGetID(event){
        event.preventDefault();
        console.log(Auth.getCookie('token'));
        //need to check if cookie is alive
        console.log(Auth.parseJwt(Auth.getCookie('token')).sub);
    }

    onTestAuth(event){
        event.preventDefault();
        fetch("http://localhost:5000/posts/testAuth",{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        }).then(results => {
            return results.json();
        }).then(data => {
            console.log(data);
        })
    }

    onPost(event){
        event.preventDefault();
        const fetchURL = 'http://localhost:5000/posts/' + Auth.parseJwt(Auth.getCookie('token')).sub;
        console.log(fetchURL);
        console.log(this.state.posttext);
        console.log(this.state.location);
        fetch(fetchURL,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                content: this.state.posttext,
                location: {
                    type: "Point",
                    coordinates: this.state.location
                }
            })
        })
            .then(results => {
                return results.json()
            })
    }



    onGetUserPosts(event){
        event.preventDefault();
        const fetchURL = 'http://localhost:5000/users/' + Auth.parseJwt(Auth.getCookie('token')).sub;
        console.log(fetchURL);
        console.log("Change 1");
        fetch(fetchURL,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(results => {
                return results.json();
            }).then(data =>{
                this.setState({
                    messageIDs: data.message[0].posts,
                })
                console.log(this.state.messageIDs);
            })
    }

    //Currently using wrong endpoint. needs postIDs.
    //Need to get onGetUserPosts working first, store in state, use here
    onGetUserPostsContent(event){
        event.preventDefault();
        const fetchURL = 'http://localhost:5000/posts/' + this.state.messageIDs[0];
        console.log(fetchURL);
        fetch(fetchURL)
            .then(results => {
                return results.json()
            }).then(data =>{
                console.log(data);
            })
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
                <input
                    className="getUserPostContent"
                    value="Get User Posts Content"
                    type="submit"
                    onClick={this.onGetUserPostsContent}
                />
                <input
                    classame="testRequireAuth"
                    value="Test RequireAuth"
                    type="submit"
                    onClick={this.onTestAuth}
                />
                <input
                    className="form-text"
                    placeholder="Post text"
                    name="posttext"
                    type="text"
                    onChange={this.onChange}
                />
                <input
                    className="submitPost"
                    value="Post"
                    type="submit"
                    onClick={this.onPost}
                />

                </form>
            </main>
        )
    }
}

export default Test
