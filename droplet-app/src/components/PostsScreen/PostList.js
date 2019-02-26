import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card/Card'

const PostList = ({posts}) => {  
  return (
        <ul className="post-list">
            {posts.map(post => (
                <Card 
                    key={post.id}
                    name={post.name} 
                    text={post.text} 
                    date={post.date} 
                    picture={post.picture} 
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
