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
    }

    render(){
        const head = (
            <ProfileCard
                username={this.props.username}
                bio={this.props.bio}
            />
        )
        return(
            <main className={this.props.theme ? 'profile-screen screen dark' : 'profile-screen screen'}>
                {head}
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
        time: state.time,
        theme: state.themeId,
    }
}
export default connect(mapStateToProps)(ProfileScreen);
