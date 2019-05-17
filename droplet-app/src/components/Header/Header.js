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

const DisplayLogout = (props) => {
    if(props.isAuthenticated !== ""){
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
            <span className='theme-pad' onClick={() => props.dispatch(toggleTheme())}><div className='theme-dot' alt='Theme switcher'></div></span>
            <img className='logo' src={Logo} alt='Droplet logo' />
            <DisplayLogout isAuthenticated={props.userid}/>
        </header>
    )
}

const mapStateToProps = (state) => ({
        theme: state.themeId,
        userid: state.profile.userid
    })

export default connect(mapStateToProps)(Header)
