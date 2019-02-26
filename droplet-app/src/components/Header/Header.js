import React from 'react'
import './Header.css'
import Logo from './logo.png'

import { connect } from 'react-redux'
import toggleTheme from '../../actions/actionCreators'

// const currentThemeDotState = store.getState().themeDotReducer.currentTheme

const Header = () => (
    <header className="app-header">
        <img className='logo' src={Logo} alt='Droplet logo' />
        <div className='theme-dot' onClick={toggleTheme} alt='Theme switcher'></div>
    </header>
)

const mapStateToProps = (state) => {
    return {
        currentTheme: state.currentTheme
    }
}

const mapDispatchToProps = { toggleTheme }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
