import React from 'react'
import './Footer.scss'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleNewPostModal } from '../../actions/postActions'

import homeIcon from './images/home.svg'
import mapIcon from './images/map.svg'
import newIcon from './images/new.svg'
import notificationsIcon from './images/notifications.svg'
import profileIcon from './images/profile.svg'

const Footer = (props) => {

    const getNewDropBtnStyleClasses = () => props.visiblity ? 'new-button x-btn' : 'new-button'

    return (
        <footer className='app-footer'>
            <nav>
                <ul className='nav-buttons'>
                    <li><NavLink activeClassName='selected' to={'/'}><img src={homeIcon} alt='Home screen icon'/></NavLink></li>
                    <li><NavLink activeClassName='selected' to={'/map'}><img src={mapIcon} alt='Map screen icon'/></NavLink></li>
                    <li className={ getNewDropBtnStyleClasses() } onClick={() => {props.dispatch(toggleNewPostModal())}}><span className='xl' /></li>
                    <li><NavLink activeClassName='selected' to={'/likes'}><img src={notificationsIcon} alt='Notification screen icon'/></NavLink></li>
                    <li><NavLink activeClassName='selected' to={'/profile'}><img src={profileIcon} alt='Profile screen icon'/></NavLink></li>
                </ul>
            </nav>
        </footer>
    )
}

const mapStateToProps = (state) => {
    return {
        visiblity: state.newPostModal.visible
    }
}

export default connect(mapStateToProps)(Footer);
