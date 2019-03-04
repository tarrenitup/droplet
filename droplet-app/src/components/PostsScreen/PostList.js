import React from 'react'
import PropTypes from 'prop-types'
import './PostList.css'
import Card from '../Card/Card'

const PostList = ({posts}) => {  
  return (
        <ul className="post-list">
            {posts.map(post => (
                <Card 
                    key={post._id} 
                    name={post.username} 
                    text={post.content} 
                    date={post.created} 
                    picture={post.postImage} 
                    likes={post.likes} 
                    edited={post.edited} 
                />)
            )}
        </ul>
    )
}

PostList.propTypes = {
  cats: PropTypes.array.isRequired
}

export default PostList;
