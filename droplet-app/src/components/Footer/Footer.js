import React, { Component } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import homeIcon from './images/home.svg'
import mapIcon from './images/map.svg'
import newIcon from './images/new.svg'
import notificationsIcon from './images/notifications.svg'
import profileIcon from './images/profile.svg'

const Footer = () => (
    <footer className='app-footer'>
        <nav>
            <ul className='nav-buttons'>
                <li><Link to={'./'}><img src={homeIcon} alt='Home screen icon'/></Link></li>
                <li><Link to={'./map'}><img src={mapIcon} alt='Map screen icon'/></Link></li>
                <li><Link to={'./new'}><img src={newIcon} alt='New Droplet screen icon'/></Link></li>
                <li><Link to={'./likes'}><img src={notificationsIcon} alt='Notification screen icon'/></Link></li>
                <li><Link to={'./profile'}><img src={profileIcon} alt='Profile screen icon'/></Link></li>
            </ul>
        </nav>
    </footer>
)

export default Footer;
