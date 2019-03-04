import React from 'react';
import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { loadPosts } from './actions/postActions';
import App from './components/App/App'

const store = configureStore()

store.dispatch(loadPosts())

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
