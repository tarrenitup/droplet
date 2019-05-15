import React from 'react'
import { render } from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { loadHomePosts } from './actions/postActions'
import { loadLoginData } from './actions/loginActions'
import { updateLocation } from './actions/miscActions'
import {updateTime} from './actions/miscActions'
import App from './components/App/App'
import Auth from './components/Auth/Auth.js'

const store = configureStore()

if(Auth.isAuthenticated()){
    const name = Auth.parseJwt(Auth.getCookie('token')).name;
    const id = Auth.parseJwt(Auth.getCookie('token')).sub;
    store.dispatch(loadLoginData(name,id));
    if(navigator.geolocation){
        navigator.geolocation.watchPosition((pos) =>{
            let location = [pos.coords.longitude, pos.coords.latitude];
            store.dispatch(updateLocation(location));
        })
    }
}

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)

// change to ".register()" on production branch.
serviceWorker.unregister();
