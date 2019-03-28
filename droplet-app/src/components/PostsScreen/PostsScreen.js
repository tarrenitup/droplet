import React from 'react'
import { connect } from 'react-redux'
import './PostsScreen.css'
import PropTypes from 'prop-types'
import PostList from './PostList'

const PostsScreen = (props) => (
    <main className='posts-screen screen'>
       <PostList homePosts={props.homePosts} />
    </main>
)

PostsScreen.propTypes = {
    homePosts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return { homePosts: state.homePosts }
} 

export default connect(mapStateToProps)(PostsScreen); 
