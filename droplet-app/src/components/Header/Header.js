import React from 'react'
import './Header.css'
import Logo from './logo.png'
import Signout from './signout.svg'
import Auth from '../Auth/Auth.js'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

// const currentThemeDotState = store.getState().themeDotReducer.currentTheme

function logout(){
    Auth.eraseCookie('token');
    window.location.assign('/login');
    //return <Redirect to='/login' />
}

const DisplayLogout = () => {
    if(Auth.isAuthenticated() === true){
        return (<img alt='logout icon' src={Signout} className='logout' onClick={logout} />)
    }
    else {
        return <div />
    }
}

const Header = () => (
    <header className="app-header">
        <div className='theme-dot' alt='Theme switcher'></div>
        <img className='logo' src={Logo} alt='Droplet logo' />
        <DisplayLogout/>
    </header>
)

export default Header
