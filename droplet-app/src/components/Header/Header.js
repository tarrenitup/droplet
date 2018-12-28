import React, { Component } from 'react'
import './Header.css'
import Logo from './logo.png'

const Header = () => (
    <header className="app-header">
        <img class='logo' src={Logo} alt='Droplet logo' />
    </header>
)

export default Header;
