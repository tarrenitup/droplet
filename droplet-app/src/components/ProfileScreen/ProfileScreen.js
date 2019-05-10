import React, { Component } from 'react'
import './ProfileScreen.css'
import ProfileCard from './ProfileCard.js'
import Auth from '../Auth/Auth.js'
import PostList from './PostList'
import {loadProfilePosts} from '../../actions/postActions'
import {loadBio} from '../../actions/profileActions'
import {updateTime} from '../../actions/miscActions'

import {connect} from 'react-redux'

class ProfileScreen extends Component{
    constructor(props){
        super(props);
        let userID = Auth.parseJwt(Auth.getCookie('token')).sub;
        this.props.dispatch(loadProfilePosts());
        this.props.dispatch(loadBio());
        this.props.dispatch(updateTime());
    }

    render(){
        const head = (
            <ProfileCard
                username={this.props.username}
                bio={this.props.bio}
            />
        )

        return(
            <main className='profile-screen'>
                {head}
                <PostList posts={this.props.posts}/>
            </main>
        )
    }
}
//                <PostList posts={this.props.posts}/>

function mapStateToProps(state){
    return {
        username: state.profile.username,
        posts: state.profile.posts,
        bio: state.profile.bio,
        time: state.time
    }
}
export default connect(mapStateToProps)(ProfileScreen);
