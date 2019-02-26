import React from 'react'
import './Card.css'
import likesIcon from './likes.svg'

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
                <img src={likesIcon} alt='The likes icon'/>
                <p>{props.likes}</p>
            </div>
        </div>
    </div>
)

export default Card;
