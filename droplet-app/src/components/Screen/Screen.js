import React, { Component } from 'react'
import Card from '../Card/Card.js'
import './Screen.css'
import sampleProfPic from './images/profile.jpg'

const Screen = () => (
    <section className='sample-screen'>
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
         <Card 
            profilePic={{pic: sampleProfPic, alt: 'A profile pic'}}
            username='@BLAHHH'
            text='Yooo'
            likes='000'
        />
    </section>
)

export default Screen;