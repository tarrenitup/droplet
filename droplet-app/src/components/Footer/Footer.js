import React from 'react'
import './Footer.scss'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleNewPostModal } from '../../actions/postActions'
import { changePageIndex } from '../../actions/footerActions'
import { isAuthenticated } from '../Auth/Auth.js'

const Footer = (props) => {

    const getNewDropBtnStyleClasses = () => props.visiblity ? 'new-button x-btn' : 'new-button'

    console.log(props.currentPageIndex)

    return (
        <footer className='app-footer'>
            <nav>
                <ul className='nav-buttons'>
                    <li className='home'><NavLink onClick={() => props.dispatch(changePageIndex(0))} to={'/'}><div className='nav-icon' /></NavLink></li>
                    <li className='map'><NavLink onClick={() => props.dispatch(changePageIndex(1))} to={'/map'}><div className='nav-icon' /></NavLink></li>
                    <li className={ getNewDropBtnStyleClasses() } onClick={() => {
                        if(isAuthenticated()){
                            props.dispatch(toggleNewPostModal())
                        }
                    }}><span className='xl' /></li>
                    <li className='likes'><NavLink onClick={() => props.dispatch(changePageIndex(2))} to={'/likes'}><div className='nav-icon' /></NavLink></li>
                    <li className='profile'><NavLink onClick={() => props.dispatch(changePageIndex(3))} to={'/profile'}><div className='nav-icon' /></NavLink></li>
                </ul>
            </nav>
        </footer>
    )
}

const mapStateToProps = (state) => {
    return {
        visiblity: state.newPostModal.visible,
        currentPageIndex: state.currentPageIndex,
    }
}

export default connect(mapStateToProps)(Footer);
