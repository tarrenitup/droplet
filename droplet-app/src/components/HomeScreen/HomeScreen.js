import React from 'react'
import './HomeScreen.css'

const HomeScreen = (props) => (
    <main className='home-screen screen screen-outer'>
        {props.children}
    </main>
)

export default HomeScreen;
