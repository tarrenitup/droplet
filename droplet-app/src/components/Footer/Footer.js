import React from 'react'
import './Footer.scss'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleNewPostModal } from '../../actions/postActions'
import { isAuthenticated } from '../Auth/Auth.js'

const Footer = (props) => {

    const getNewDropBtnStyleClasses = () => props.visiblity ? 'new-button x-btn' : 'new-button'

    const footerStyleClass = props.theme ? 'app-footer dark' : 'app-footer'

    return (
        <footer className={footerStyleClass}>
            <nav>
                <ul className='nav-buttons'>

                    <li className='home'><NavLink exact to={'/'}><div className='nav-icon' /></NavLink></li>
                    <li className='map'><NavLink to={'/map'}><div className='nav-icon' /></NavLink></li>
                    <li className={ getNewDropBtnStyleClasses() } onClick={() => {
                        if(isAuthenticated()){
                            props.dispatch(toggleNewPostModal())
                        }
                    }}><span className='xl' /></li>
                    <li className='likes'><NavLink to={'/likes'}><div className='nav-icon' /></NavLink></li>
                    <li className='profile'><NavLink to={'/profile'}><div className='nav-icon' /></NavLink></li>
                </ul>
            </nav>
        </footer>
    )
}

const mapStateToProps = (state) => {
    return {
        visiblity: state.newPostModal.visible,
        selectedPageIndex: state.selectedPageIndex,
        theme: state.themeId
    }
}

export default connect(mapStateToProps)(Footer);
