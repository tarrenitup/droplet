import React, { Component } from 'react'
import './ProfileScreen.css'
import Card from '../Card/Card.js'
import ProfileCard from './ProfileCard.js'
import Auth from '../Auth/Auth.js'

class ProfileScreen extends Component{
    constructor(){
        super();
        this.state = {
            userid: null,
            username: null,
            messages: [],
            bio: null
        }
        this.getUserID = this.getUserID.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getUserPostsContent = this.getUserPostsContent.bind(this);
        
        this.getUserID();
        this.getUserName();
        this.getUserPostsContent();
    }

    getUserID(){
        const userID = Auth.parseJwt(Auth.getCookie('token')).sub;
        this.state.userid = userID;
    }
        
    getUserName(){
        const userID = this.state.userid;
        const fetchURL = 'http://localhost:5000/users/getUserByID/' + userID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token;
        
        fetch(fetchURL,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
           }
        })
            .then(results => {
                return results.json()
            }).then(data =>{
                this.setState({
                    username: data.username,
                    bio: data.bio
                })
            })
    }
    
    getUserPostsContent(){
        const userID = this.state.userid;
        const fetchURL = 'http://localhost:5000/posts/getUserPosts/' + userID;
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token;
        
        //Get each post individually w/ array of postIDs.
        
        fetch(fetchURL,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
           }
        })
            .then(results => {
                return results.json()
            }).then(data =>{
                this.setState({
                    messages: data.messages,
                })
            })
    }

    render(){
        const items = this.state.messages.map((message, key)=>
            <Card
                key={message._id}
                postID={message._id}
                name={message.username}
                text={message.content}
                date={message.created}
                picture={message.postImage}
                likes={message.likes.length}
            />
        );
        
        const head = (
            <ProfileCard
                username={this.state.username}
                bio={this.state.bio}
            />
        )

        return(
            <main className='profile-screen'>
                {head}
                {items}
            </main>
        )
    }
}

export default ProfileScreen;
