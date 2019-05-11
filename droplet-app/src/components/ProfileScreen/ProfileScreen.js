import React, { Component } from 'react'
import './ProfileScreen.css'
import ProfileCard from './ProfileCard.js'
import Auth from '../Auth/Auth.js'
import PostList from '../PostList/PostList'
import {loadProfilePosts} from '../../actions/postActions'
import {loadBio} from '../../actions/profileActions'
import {updateTime,profilePage} from '../../actions/miscActions'

import {connect} from 'react-redux'

class ProfileScreen extends Component{
    constructor(props){
        super(props);
        this.props.dispatch(loadProfilePosts(this.props.userid));
        this.props.dispatch(loadBio(this.props.userid));
        this.props.dispatch(profilePage());
        this.props.dispatch(updateTime());
        console.log(this.props.userid);
    }

    //Remove this later
    handleComment(event,dispatch){
        event.preventDefault();
        const commentContent = this.getComment.value;
        const userID = this.props.userid;
        const fetchURL = 'http://localhost:5000/posts/' + "5cd63e41e355ce2a68d81efd/" + userID + "/addComment";
        const token = Auth.getCookie('token');
        const header = 'Bearer ' + token;
        console.log(fetchURL);
        console.log(commentContent);
        return fetch(fetchURL,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            },
            body:JSON.stringify({
                content: commentContent,
                username: this.props.username
            })
        }).then(response => {
            //This gives the whole post. Replace the post in the store with this.
            return response.json()
        }).catch(error => {
            return error
        });
    }

    render(){
        const head = (
            <ProfileCard
                username={this.props.username}
                bio={this.props.bio}
            />
        )
        //Remove form later
        return(
            <main className='profile-screen'>
                {head}
                <form onSubmit={(e) => this.handleComment(e,this.props.dispatch)}>
                    <textarea
                        className="comment-textarea"
                        placeholder="Write a comment..."
                        name="commentText"
                        ref={(input) => this.getComment = input}
                    />
                    <input
                        className="submitComment"
                        value="Comment"
                        type="submit"
                    />
                </form>
                <PostList posts={this.props.posts} like={false}/>
            </main>
        )
    }
}
//                <PostList posts={this.props.posts}/>

function mapStateToProps(state){
    return {
        username: state.profile.username,
        posts: state.profile.posts,
        userid: state.profile.userid,
        bio: state.profile.bio,
        time: state.time
    }
}
export default connect(mapStateToProps)(ProfileScreen);
