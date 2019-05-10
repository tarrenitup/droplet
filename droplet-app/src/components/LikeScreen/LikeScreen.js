import React, {Component} from 'react'
import './LikeScreen.css'
import Card from '../Card/Card.js'
import Auth from '../Auth/Auth.js'
import PostList from './PostList'

import {connect} from 'react-redux'
import {loadYourLikedPosts} from '../../actions/postActions'
import {updateTime} from '../../actions/miscActions'

class LikeScreen extends Component{
    constructor(props){
        super(props);

        this.props.dispatch(loadYourLikedPosts());
        this.props.dispatch(updateTime());
    }

    render(){
        return(
            <main className='like-screen screen'>
                <PostList posts={this.props.likedPosts} time={this.props.time}/>
            </main>
        )
    }
}

function mapStateToProps(state){
    return{
        time: state.time,
        likedPosts: state.likedPosts
    }
}

export default connect(mapStateToProps)(LikeScreen);
