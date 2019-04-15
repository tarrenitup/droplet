import React from 'react'
import './Card.css'
import likesIcon from './likes.svg'
import Auth from '../Auth/Auth.js'

function addLike(postID){
    const userID = Auth.parseJwt(Auth.getCookie('token')).sub;
    const fetchURL = 'http://localhost:5000/posts/like/' + userID + '/' + postID;
    const token = Auth.getCookie('token');
    const header = 'Bearer ' + token
    console.log(fetchURL);
    fetch(fetchURL,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': header
        }
    })
}

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

const Card = (props) => (
    <div className='card'>
        <div className='card-top'>
            <img className='profile-pic' src={props.picture} alt='profile' />
            <p className='username'>{props.name}</p>
        </div>

        <PostMedia mediaType={props.mediaType} mediaSource={props.mediaSource} />

        <p className='card-text'>{props.text}{props.edited ? ' edited' : ''}</p>

        <div className='card-bottom'>
            <div className='likes'>
                <img src={likesIcon} alt='The likes icon' onClick={() => addLike(props.postID)}/>
                <p>{props.likes}</p>
            </div>
        </div>
    </div>
)

export default Card;
