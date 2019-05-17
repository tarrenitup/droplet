import React from 'react'
import PropTypes from 'prop-types'
import './PostList.css'
import Card from '../Card/Card'

const PostList = (props) => {
    if(props.like === true){
        const items = props.posts.map((post, index)=>{
            let timeSince = Math.round((props.time-(new Date(post.likesupdated)))/1000);
            let timeSinceString = "";
            if (timeSince > (60*60*24*7)){
                timeSinceString = "     Liked " + Math.round(timeSince/(60*60*24*7)) + " weeks ago"
            }
            else if(timeSince > (60*60*24)){
                timeSinceString = "Liked " +Math.round(timeSince/(60*60*24)) + " days ago"
            }
            else if (timeSince > (60*60)){
                timeSinceString = "Liked " +Math.round(timeSince/(60*60)) + " hours ago"
            }
            else if (timeSince > 60){
                timeSinceString = "Liked " +Math.round(timeSince/60) + " minutes ago"
            }
            else if (timeSince < 60){
                timeSinceString = "Liked " + timeSince + " seconds ago"
            }
            let mediaType = ''
            if(post.postImage !== undefined){
                mediaType = 'photo'
            }
            return <Card
                key={post._id}
                postID={post._id}
                name={post.username}
                picture={post.profilePic}
                text={post.content}
                date={post.created}
                mediaSource={post.postImage}
                mediaType={mediaType}
                likes={post.likes.length}
                newLikes={post.newLikes}
                numNewLikes={post.numNewLikes}
                comments={post.comments}
                timeSinceLike={timeSinceString}
            />
        });
        return (
            <ul className="post-list">
                {items}
            </ul>
        )
    }
    else{
        return (
            <ul className="post-list">
                {props.posts.map((post, index) => {
                    let mediaType = ''
                    if(post.postImage !== undefined){
                        mediaType = 'photo'
                    }
                    return(
                    <Card
                        key={post._id}
                        postID={post._id}
                        name={post.username}
                        picture={post.profilePic}
                        text={post.content}
                        date={post.created}
                        mediaSource={post.postImage}
                        mediaType={mediaType}
                        likes={post.likes.length}
                        comments={post.comments}
                    />)}
                )}
            </ul>
        )
    }
}
/*
PostList.propTypes = {
  homePosts: PropTypes.array.isRequired
}
*/
export default PostList;
