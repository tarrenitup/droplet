import React from 'react'
import { connect } from 'react-redux'
import './PostsScreen.css'
import PropTypes from 'prop-types'
import PostList from './PostList'

const PostsScreen = (props) => (
    <main className='posts-screen screen'>
       <PostList posts={props.posts} />
    </main>
)

PostsScreen.propTypes = {
    posts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return { posts: state.droplet.pages[0].posts }
} 

export default connect(mapStateToProps)(PostsScreen); 
