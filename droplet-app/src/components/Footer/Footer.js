import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
import homeIcon from './images/home.svg'
import homeActiveIcon from './images/home-active.svg'
import mapIcon from './images/map.svg'
import newIcon from './images/new.svg'
import notificationsIcon from './images/notifications.svg'
import profileIcon from './images/profile.svg'

const Footer = () => {

    const printClick = (e) => {
        console.log(e.target)
    }

    return (
        <footer className='app-footer'>
            <nav>
                <ul className='nav-buttons' onClick={(e) => { return printClick(e) }}>
                    <li><NavLink to={'/'}><img src={homeIcon} alt='Home screen icon'/></NavLink></li>
                    <li><NavLink to={'/map'}><img src={mapIcon} alt='Map screen icon'/></NavLink></li>
                    <li><NavLink to={'/new'}><img src={newIcon} alt='New Droplet screen icon'/></NavLink></li>
                    <li><NavLink to={'/likes'}><img src={notificationsIcon} alt='Notification screen icon'/></NavLink></li>
                    <li><NavLink to={'/profile'}><img src={profileIcon} alt='Profile screen icon'/></NavLink></li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer;
