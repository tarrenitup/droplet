import React from 'react'
import './Header.css'
import Logo from './logo.png'

import { createStore, combineReducers } from 'redux'

const createThemeDotAction = (currentTheme) => ({
    type: 'TOGGLE_THEME',
    payload: {
        currentTheme: currentTheme
    }
})

const themeDotReducer = (state = false, action) => {
    if (action.type === 'TOGGLE_THEME') {
        return {
            ...state,
            currentTheme: !state.currentTheme
        }
    } else {
        return state
    }
}

const rootReducer = combineReducers({
    themeDotReducer: themeDotReducer
})

const store = createStore(rootReducer)

store.dispatch(createThemeDotAction(true))
store.dispatch(createThemeDotAction(false))

console.log(store.getState())

const Header = () => (
    <header className="app-header">
        <img className='logo' src={Logo} alt='Droplet logo' />
        <div className='theme-dot' alt='Theme switcher'></div>
    </header>
)

export default Header;
