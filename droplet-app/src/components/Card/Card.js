import React, { Component } from 'react'
import './Card.css'
import likesIcon from './likes.svg'

const Card = (props) => (
    <div className='card'>
        <div className='card-top'>
            <img className='profile-pic' src={props.profilePic.pic} alt={props.profilePic.alt} />
            <p className='username'>{props.username}</p>
        </div>
        
        <p className='card-text'>{props.text}</p>
       
        <div className='card-bottom'>
            <div className='likes'>
                <img src={likesIcon} alt='The likes icon'/>
                <p>{props.likes}</p>
            </div>
        </div>
    </div>
)

export default Card;