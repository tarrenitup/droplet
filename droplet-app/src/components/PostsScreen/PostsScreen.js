import React from 'react'
import { connect } from 'react-redux'
import './PostsScreen.css'
import PropTypes from 'prop-types'
import PostList from './PostList';

import * as postsActions from '../../actions/postActions';

const PostsScreen = (props) => (
    <div className='posts-screen screen'>
       <PostList posts={props.posts} />
    </div>
)

PostsScreen.propTypes = {
    posts: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        // props for PostsScreen: state from store (updates on each state change)
        posts: state.posts
    };
} 

export default connect(mapStateToProps)(PostsScreen); 
