import React, { Component } from 'react'
import './Footer.css'
import homeIcon from './images/home.svg'
import mapIcon from './images/map.svg'
import newIcon from './images/new.svg'
import notificationsIcon from './images/notifications.svg'
import profileIcon from './images/profile.svg'

const Footer = () => (
    <footer className='app-footer'>
        <nav>
            <ul className='nav-buttons'>
                <li><img src={homeIcon} alt='Home screen icon'/></li>
                <li><img src={mapIcon} alt='Map screen icon'/></li>
                <li><img src={newIcon} alt='New Droplet screen icon'/></li>
                <li><img src={notificationsIcon} alt='Notification screen icon'/></li>
                <li><img src={profileIcon} alt='Profile screen icon'/></li>
            </ul>
        </nav>
    </footer>
)

export default Footer;
