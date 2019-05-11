import React, {useState} from 'react'
import './Card.css'
import Auth from '../Auth/Auth.js'
import CommentCard from './CommentCard'

function submitComment(e,content, props){
    e.preventDefault();
    const fetchURL = 'http://localhost:5000/posts/' + props.postid + "/" + props.userid + "/addComment";
    const token = Auth.getCookie('token');
    const header = 'Bearer ' + token;
    console.log(fetchURL);
    return fetch(fetchURL,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': header
        },
        body:JSON.stringify({
            content: content,
            username: props.username
        })
    }).then(response => {
        //This gives the whole post. Replace the post in the store with this.
        return response.json()
    }).catch(error => {
        return error
    });
}

const CommentList = (props) => {
    const [content, input] = useState("");
    return(
        <div  style={{display: props.display ? 'inline' : 'none'}}>
            <form onSubmit={(e) => submitComment(e,content,props)}>
                <textarea
                    className="comment-textarea"
                    placeholder="Write a comment..."
                    name="commentText"
                    value={content}
                    onChange={(e) => input(e.target.value)}
                />
                <input
                    className="submitComment"
                    value="Comment"
                    type="submit"
                />
            </form>
            <ul className="comment-list">
                {props.comments.map((comment,index) => (
                    <CommentCard
                        key={comment._id}
                        commentID={comment._id}
                        postID={props.postid}
                        name={comment.username}
                        text={comment.content}
                        date={comment.created}
                        likes={comment.likes.length}
                    />)
                )}
            </ul>
        </div>
    )
}

export default CommentList;
