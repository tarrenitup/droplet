import React from 'react'
import './CommentCard.scss'
import Auth from '../Auth/Auth.js'
import likesIcon from './likes.svg'
import {connect} from 'react-redux'
import {likeComment} from '../../actions/postActions'

function updateCommentLike(userID, postID, commentID){
    const fetchURL = 'http://localhost:5000/posts/likeComment/' + userID + '/' + postID + '/' + commentID;
    const token = Auth.getCookie('token');
    const header = 'Bearer ' + token;
    return fetch(fetchURL,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': header
        }
    })
    .then(result =>{
        return result.json();
    })
    .catch(error=>{
        return error
    })
}

function modifyCommentLikes(props){
    switch(props.selectedPageIndex){
        case 0:
            //Find post clicked on
            let likedPost0 = props.homePosts.find((post)=>{
                return post._id === props.postID;
            });
            //Find comment clicked on
            let likedComment0 = likedPost0.comments.find((comment)=>{
                return comment._id === props.commentID;
            });
            //Find if user is in that comments' likes array
            let liked0 = "";
            if(props.userid !== ""){    //need to ensure userID was set properly
                liked0 = likedComment0.likes.find((likes)=>{
                    return likes === props.userid;
                })
            }
            //If not found, create copy of post w/ userID added to likes, dispatch
            if(liked0 === undefined){   //Not yet liked
                let newLikedComment0 = Object.assign({},likedComment0);
                let newLikedCommentLikes0 = [...newLikedComment0.likes];
                newLikedCommentLikes0.push(props.userid);
                newLikedComment0.likes = newLikedCommentLikes0;
                props.dispatch(likeComment(newLikedComment0,props.postID, 0));
                updateCommentLike(props.userid,props.postID,props.commentID);
            }
            break;
        case 1:
            break;
        case 2:
            let likedPost2 = props.likedPosts.find((post)=>{
                return post._id === props.postID;
            });
            let likedComment2 = likedPost2.comments.find((comment)=>{
                return comment._id === props.commentID;
            });
            let liked2 = "";
            if(props.userid !== ""){    //need to ensure userID was set properly
                liked2 = likedComment2.likes.find((likes)=>{
                    return likes === props.userid;
                })
            }
            if(liked2 === undefined){
                let newLikedComment2 = Object.assign({},likedComment2);
                let newLikedCommentLikes2 = [...newLikedComment2.likes];
                newLikedCommentLikes2.push(props.userid);
                newLikedComment2.likes = newLikedCommentLikes2;
                props.dispatch(likeComment(newLikedComment2,props.postID, 2));
                updateCommentLike(props.userid,props.postID,props.commentID);
            }
            break;
        case 3:
            let likedPost3 = props.profilePosts.find((post)=>{
                return post._id === props.postID;
            });
            let likedComment3 = likedPost3.comments.find((comment)=>{
                return comment._id === props.commentID;
            });
            let liked3 = "";
            if(props.userid !== ""){    //need to ensure userID was set properly
                liked3 = likedComment3.likes.find((likes)=>{
                    return likes === props.userid;
                })
            }
            if(liked3 === undefined){
                let newLikedComment3 = Object.assign({},likedComment3);
                let newLikedCommentLikes3 = [...newLikedComment3.likes];
                newLikedCommentLikes3.push(props.userid);
                newLikedComment3.likes = newLikedCommentLikes3;
                props.dispatch(likeComment(newLikedComment3,props.postID, 3));
                updateCommentLike(props.userid,props.postID,props.commentID);
            }
            break;
        default:
            break;
    }
}

// Removed             <img className='profile-pic' src={props.picture} alt='' />
// Used to be right under div card-top, was the profile image.
// Need to find way to get profile image
const CommentCard = (props) => (
    <li className='comment-card'>
        <div className='card-top'>
            <p className='username'>{props.name}</p>
        </div>
        <p className='card-text'>{props.text}{props.edited ? ' edited' : ''}</p>

        <div className='card-bottom'>
            <div className='likes'>
                <img className='like' src={likesIcon} alt='like' onClick={() => modifyCommentLikes(props)}/>
                <p>{props.likes}</p>
            </div>
        </div>
    </li>
)

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

export default connect(mapStateToProps)(CommentCard);
