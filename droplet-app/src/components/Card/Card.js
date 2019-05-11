import React from 'react'
import './Card.css'
import likesIcon from './likes.svg'
import commentIcon from './comment.svg'
import Auth from '../Auth/Auth.js'
import {connect} from 'react-redux'
import {likePost} from '../../actions/postActions'

const PostMedia = (props) => {

    switch(props.mediaType) {
        case 'photo':
            return (<div className='post-media'><img src={props.mediaSource} /></div>)
        case 'video':
            return (<div className='post-media'><video src={props.mediaSource} /></div>)
        default:
            return (<div></div>)
    }
}

function updateLike(userID, postID){
    const fetchURL = 'http://localhost:5000/posts/like/' + userID + '/' + postID;
    const token = Auth.getCookie('token');
    const header = 'Bearer ' + token
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

function modifyLikes(props){
    switch(props.selectedPageIndex){
        case 0:
            //Find post clicked on
            let likedPost0 = props.homePosts.find((post)=>{
                return post._id === props.postID;
            });
            //Find if user is in that posts' likes array
            let liked0 = "";
            if(props.userid !== ""){    //need to ensure userID was set properly
                liked0 = likedPost0.likes.find((likes)=>{
                    return likes === props.userid;
                })
            }
            //If not found, create copy of post w/ userID added to likes, dispatch
            if(liked0 === undefined){   //Not yet liked
                let newLikedPost0 = Object.assign({},likedPost0);
                let newLikedPostLikes0 = [...newLikedPost0.likes];
                newLikedPostLikes0.push(props.userid);
                newLikedPost0.likes = newLikedPostLikes0;
                props.dispatch(likePost(newLikedPost0, 0));
                updateLike(props.userid,props.postID);
            }
            break;
        case 1:
            break;
        case 2:
            let likedPost2 = props.likedPosts.find((post)=>{
                return post._id === props.postID;
            });
            let liked2 = likedPost2.likes.find((likes)=>{
                return likes === props.userid;
            })
            if(liked2 === undefined){
                let newLikedPost2 = Object.assign({},likedPost2);
                let newLikedPostLikes2 = [...newLikedPost2.likes];
                newLikedPostLikes2.push(props.userid);
                newLikedPost2.likes = newLikedPostLikes2;
                props.dispatch(likePost(newLikedPost2, 2));
                updateLike(props.userid,props.postID);
            }
            break;
        case 3:
            let likedPost3 = props.profilePosts.find((post)=>{
                return post._id === props.postID;
            });
            let liked3 = likedPost3.likes.find((likes)=>{
                return likes === props.userid;
            })
            if(liked3 === undefined){
                let newLikedPost3 = Object.assign({},likedPost3);
                let newLikedPostLikes3 = [...newLikedPost3.likes];
                newLikedPostLikes3.push(props.userid);
                newLikedPost3.likes = newLikedPostLikes3;
                props.dispatch(likePost(newLikedPost3, 3));
                updateLike(props.userid,props.postID);
            }
            break;
        default:
            break;
    }
    //props.dispatch(likePost(props.postID,props.selectedPageIndex))
}

function showComments(props){
/*    const items = props.posts.map((post, index)=>{
        return <CommentCard
            key={post._id}
            postID={post._id}
            name={post.username}
            text={post.content}
            date={post.created}
            picture={post.postImage}
            likes={post.likes.length}
        />
    });
    <ul className="comment-list">
        {items}
    </ul>
    */
    return(
        <p></p>
    )
}

const Note = (props) => {
    if(props.added.timeSinceLike !== undefined){
        return <p> &nbsp;&nbsp;&nbsp;&nbsp;{props.added.timeSinceLike}</p>
    }
    else{
        return <p></p>
    }
}

const CommentButton = () => {
    return <p></p>
}

function makeComment(props){
    return(
        <p></p>
    )
}

// Removed             <img className='profile-pic' src={props.picture} alt='' />
// Used to be right under div card-top, was the profile image.
// Need to find way to get profile image
const CommentCard = (props) => (
    <div className='card'>
        <div className='card-top'>
            <p className='username'>{props.name}</p>
        </div>
        <p className='card-text'>{props.text}{props.edited ? ' edited' : ''}</p>

        <div className='card-bottom'>
            <div className='likes'>
                <img className='like' src={likesIcon} alt='like' onClick={() => modifyLikes(props)}/>
                <p>{props.likes}</p>
            </div>
        </div>
    </div>
)

const CommentList = (props) => {
    return(
        <ul className="comment-list">
            {props.comments.map((comment,index) => (
                <CommentCard
                    key={comment._id}
                    commentID={comment._id}
                    name={comment.username}
                    text={comment.content}
                    date={comment.created}
                    likes={comment.likes.length}
                />)
            )}
        </ul>
    )
}

//Pass card dispatch somehow.
const Card = (props) => (
    <div className='card'>
        <div className='card-top'>
            <img className='profile-pic' src={props.picture} alt='' />
            <p className='username'>{props.name}</p>
        </div>

        <PostMedia mediaType={props.mediaType} mediaSource={props.mediaSource} />

        <p className='card-text'>{props.text}{props.edited ? ' edited' : ''}</p>

        <div className='card-bottom'>
            <div className='likes'>
                <img className='like' src={likesIcon} alt='like' onClick={() => modifyLikes(props)}/>
                <p>{props.likes}</p>
                <Note added={props}/>
                <img className='comment' src={commentIcon} alt ='Comment' onClick={() => makeComment(props)}/>
            </div>
            <CommentList comments={props.comments} />
        </div>
    </div>
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

export default connect(mapStateToProps)(Card);
