import React, { Component } from 'react'
import './SampleScreen.css'
import sampleProfPic from './images/profile.jpg'
import likesIcon from './images/likes.svg'

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

const SampleScreen = () => (
    <main className='sample-screen'>
        <Card 
            profilePic={{pic: sampleProfPic, alt: 'A profile pic'}}
            username='@sampleUser'
            text='Here is the text that a person might write when making a post on Droplet that may contain some stuff.'
            likes='15'
        />
        <Card 
            profilePic={{pic: sampleProfPic, alt: 'A profile pic'}}
            username='@otherUser'
            text='Blah blah blah'
            likes='112'
        />
        <Card 
            profilePic={{pic: sampleProfPic, alt: 'A profile pic'}}
            username='@weirdUser'
            text='Here is the text that a person might write when making a post on Droplet that may contain some stuff.'
            likes='-22'
        />
    </main>
)

export default SampleScreen;