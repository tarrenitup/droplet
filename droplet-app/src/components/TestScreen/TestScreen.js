import React, { Component } from 'react'
import './Test.css'
import Auth from '../Auth/Auth.js'

class Test extends Component{
    constructor(){
        super();
        this.state = {
            messageIDs: [],
            postList: [],
            posttext: '',
            postid: '',
            location: []
        }
        this.onGetLocation = this.onGetLocation.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPost = this.onPost.bind(this);
        this.onGetUserPosts = this.onGetUserPosts.bind(this);
        this.onGetUserPostsContent = this.onGetUserPostsContent.bind(this);
        this.onPostUpdate = this.onPostUpdate.bind(this);
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

    onTestIsAuth(event){
        event.preventDefault();
        console.log(Auth.isAuthenticated());
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
        const userID = Auth.parseJwt(Auth.getCookie('token')).sub
        const fetchURL = 'http://localhost:5000/users/' + userID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token
        console.log(header);
        console.log(fetchURL);
        console.log("Change 1");
        let testMessages = [];
        fetch(fetchURL,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            }
        })
            .then(results => {
                return results.json();
            }).then(data =>{
                this.setState({
                    messageIDs: data.message[0].posts,
                })
                testMessages = data.message[0].posts;
                console.log(this.state.messageIDs);
                console.log("Marker for test array");
                console.log(testMessages);
            })
    }

    onGetUserPostsContent(event){
        event.preventDefault();
        this.setState({
            postList: []
        })
        var i;
        //Get each post individually w/ array of postIDs.
        /*
        for(i = 0; i < this.state.messageIDs.length;i++){
            let fetchURL = 'http://localhost:5000/posts/' + this.state.messageIDs[i];
            console.log(fetchURL);
            fetch(fetchURL)
                .then(results => {
                    return results.json()
                }).then(data =>{
                    let myPosts = this.state.postList;
                    myPosts.push(data.message[0]);
                    this.setState({
                        postList: myPosts,
                    })
                })
        }
        console.log(this.state.postList);
        */
        //Get all posts attached to a user.
        const userID = Auth.parseJwt(Auth.getCookie('token')).sub;
        const fetchURL = 'http://localhost:5000/posts/getUserPostsLikesInt/' + userID;
        fetch(fetchURL)
        .then(results=> {
            return results.json()
        }).then(data =>{
            console.log(data.messages);
            console.log(data.messages[4]._id);
            console.log(data.messages[4].likesupdated);
        })
    }

    onPostUpdate(event){
        event.preventDefault();
        const fetchURL = 'http://localhost:5000/posts/' + this.state.postid;
        fetch(fetchURL,{
            method:'PATCH',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body:{
                content: this.state.posttext
            }
        }).then(results=>{
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
                    classame="testIsAuth"
                    value="Test IsAuth"
                    type="submit"
                    onClick={this.onTestIsAuth}
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
                <input
                    className="form-text"
                    placeholder="Postid"
                    name="postid"
                    type="text"
                    onChange={this.onChange}
                />
                <input
                    className="updatePost"
                    value="Update Post"
                    type="submit"
                    onClick={this.onPostUpdate}
                />

                </form>
            </main>
        )
    }
}

export default Test
