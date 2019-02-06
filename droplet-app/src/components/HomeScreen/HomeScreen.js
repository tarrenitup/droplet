import React from 'react'
import Card from '../Card/Card.js'
import './HomeScreen.css'

const HomeScreen = (props) => (
    <main className='home-screen screen'>
        <Card 
            likes='15'
        />
        <Card 
            likes='112'
        />
        <Card 
            likes='-22'
        />
         <Card 
            likes='000'
        />
    </main>
)

export default HomeScreen;
