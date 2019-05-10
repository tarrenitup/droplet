import React from 'react'
import { render } from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { loadHomePosts } from './actions/postActions'
import { loginSuccess } from './actions/loginActions'
import {updateTime} from './actions/miscActions'
import App from './components/App/App'
import Auth from './components/Auth/Auth.js'

const store = configureStore()

store.dispatch(loadHomePosts());
if(Auth.isAuthenticated()){
    const name = Auth.parseJwt(Auth.getCookie('token')).name;
    store.dispatch(loginSuccess(name));
    //Probbaly load everything else needed in case user refreshes
}
store.dispatch(updateTime());

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
