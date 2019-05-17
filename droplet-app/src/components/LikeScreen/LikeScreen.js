import React, {Component} from 'react'
import './LikeScreen.css'
import Card from '../Card/Card.js'
import Auth from '../Auth/Auth.js'
import PostList from '../PostList/PostList'

import {connect} from 'react-redux'
import {loadYourLikedPosts} from '../../actions/postActions'
import {updateTime, likePage} from '../../actions/miscActions'

class LikeScreen extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(loadYourLikedPosts(this.props.userid));
        this.props.dispatch(likePage());
        this.props.dispatch(updateTime());
    }

    render(){
        return(
            <main className='like-screen screen'>
                <PostList posts={this.props.likedPosts} time={this.props.time} like={true}/>
            </main>
        )
    }
}

function mapStateToProps(state){
    return{
        time: state.time,
        likedPosts: state.likedPosts,
        userid: state.profile.userid
    }
}

export default connect(mapStateToProps)(LikeScreen);
