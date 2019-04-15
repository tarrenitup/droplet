import React from 'react'
import './ProfileCard.css'

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

const ProfileCard = (props) => (
    <div className='profilecard'>
        <div className='profilecard-top'>
            <img className='profilecard-pic' src={props.picture} alt='' />
            <p className='username'>Welcome to your profile, <h1>{props.username}</h1></p>
        </div>
        <p>You can check out all the posts you've ever made here.</p>
    </div>
)

export default ProfileCard;