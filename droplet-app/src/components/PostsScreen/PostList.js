import React from 'react'
import PropTypes from 'prop-types'
import './PostList.css'
import Card from '../Card/Card'

const PostList = (props) => {

    return (
        <ul className="post-list">
            {props.homePosts.map((post, index) => (
                <Card
                    key={post._id}
                    postID={post._id}
                    name={post.username}
                    text={post.content}
                    date={post.created}
                    picture={post.postImage}
                    likes={post.likes.length}
                />)
            )}
        </ul>
    )
}

PostList.propTypes = {
  homePosts: PropTypes.array.isRequired
}

export default PostList;
