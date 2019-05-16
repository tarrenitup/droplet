import React from 'react'
import './Header.scss'
import Logo from './logo.png'
import Signout from './signout.svg'
import Auth from '../Auth/Auth.js'
import { toggleTheme } from '../../actions/headerActions'
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

const Header = (props) => {
    
    const headerStyleClass = props.theme ? 'app-header dark' : 'app-header'

    return (
        <header className={headerStyleClass}>
            <div className='theme-dot' onClick={() => props.dispatch(toggleTheme())} alt='Theme switcher'></div>
            <img className='logo' src={Logo} alt='Droplet logo' />
            <DisplayLogout/>
        </header>
    )
}

const mapStateToProps = (state) => ({theme: state.themeId})

export default connect(mapStateToProps)(Header)
