import React, {useState} from 'react'
import './Card.css'
import Auth from '../Auth/Auth.js'
import {connect} from 'react-redux'
import CommentCard from './CommentCard'
import {addComment} from '../../actions/postActions'


function makeCommentId(){
    const fetchIDURL = 'http://localhost:5000/posts/AComment'
    const token = Auth.getCookie('token');
    const header = 'Bearer ' + token;
    return fetch(fetchIDURL,{
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': header
        },
    }).then(response =>{
        return response.json()
    }).then(data=>{
        return data;
    }).catch(error=>{
        return error;
    });
}

function submitComment(content, commentid, props){
    const fetchURL = 'http://localhost:5000/posts/' + props.postid + "/" + props.userid + "/addComment";
    const token = Auth.getCookie('token');
    const header = 'Bearer ' + token;

        return fetch(fetchURL,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': header
            },
            body:JSON.stringify({
                content: content,
                username: props.username,
                commentid: commentid
            })
        }).then(response => {
            return response.json()
        }).catch(error => {
            return error
        });

}

//Updates store
function modifyComment(e,content, props){
    e.preventDefault();
    makeCommentId().then(commentID=>{
        if(content != ""){
            switch(props.selectedPageIndex){
                case 0:
                    //Find post commented on
                    let commentedPost0 = props.homePosts.find((post)=>{
                        return post._id === props.postid;
                    });
                    let newPost0 = Object.assign({},commentedPost0);
                    let newPostComments0 = [...newPost0.comments];
                    let newComment0 = {likes: [],
                                    created: new Date(),
                                    _id:commentID,
                                    userid: props.userid,
                                    username: props.username,
                                    content: content};
                    newPostComments0.push(newComment0);
                    newPost0.comments = newPostComments0;
                    props.dispatch(addComment(newPost0, props.postID, 0));
                    submitComment(content,commentID,props);
                    break;
                case 1:
                    break;
                case 2:
                    let commentedPost2 = props.likedPosts.find((post)=>{
                        return post._id === props.postid;
                    });
                    let newPost2 = Object.assign({},commentedPost2);
                    let newPostComments2 = [...newPost2.comments];
                    let newComment2 = {_id:commentID,
                                        userid: props.userid,
                                        username: props.username,
                                        content: content,
                                        created: new Date(),
                                        likes: []};
                    newPostComments2.push(newComment2);
                    newPost2.comments = newPostComments2;
                    props.dispatch(addComment(newPost2, props.postID, 2));
                    submitComment(content,commentID,props);
                    break;
                case 3:
                    let commentedPost3 = props.profilePosts.find((post)=>{
                        return post._id === props.postid;
                    });
                    let newPost3 = Object.assign({},commentedPost3);
                    let newPostComments3 = [...newPost3.comments];
                    let newComment3 = {_id:commentID,
                                        userid: props.userid,
                                        username: props.username,
                                        content: content,
                                        created: new Date(),
                                        likes: []};
                    newPostComments3.push(newComment3);
                    newPost3.comments = newPostComments3;
                    props.dispatch(addComment(newPost3, props.postID, 3));
                    submitComment(content,commentID,props);
                    break;
                default:
                    break;
            }
        }
    })
}

const CommentList = (props) => {
    const [content, input] = useState("");
    return(
        <div  style={{display: props.display ? 'inline' : 'none'}}>
            <form onSubmit={(e) => modifyComment(e,content,props)}>
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

function mapStateToProps(state){
    return{
        selectedPageIndex: state.selectedPageIndex,
        homePosts: state.homePosts,
        profilePosts: state.profile.posts,
        likedPosts: state.likedPosts,
        mapPosts: state.mapPosts,
        userid: state.profile.userid
    }
}

export default connect(mapStateToProps)(CommentList);
