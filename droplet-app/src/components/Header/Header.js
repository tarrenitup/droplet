import React from 'react'
import './Header.css'
import Logo from './logo.png'

import { connect } from 'react-redux'

// const currentThemeDotState = store.getState().themeDotReducer.currentTheme

const Header = () => (
    <header className="app-header">
        <img className='logo' src={Logo} alt='Droplet logo' />
        <div className='theme-dot' alt='Theme switcher'></div>
    </header>
)

export default Header