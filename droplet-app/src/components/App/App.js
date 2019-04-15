import React from 'react'
import PropTypes from 'prop-types';
import './App.css'
import { Route, Redirect } from 'react-router'

import Auth from '../Auth/Auth.js'

import NewPostModal from '../NewPostModal/NewPostModal.js'
import Overlay from '../Overlay/Overlay.js'
import Header from '../Header/Header.js'
import PostsScreen from '../PostsScreen/PostsScreen.js'
import MapScreen from '../MapScreen/MapScreen.js'
import LikeScreen from '../LikeScreen/LikeScreen.js'
import ProfileScreen from '../ProfileScreen/ProfileScreen.js'
import LoginScreen from '../LoginScreen/LoginScreen.js'
import SignUpScreen from '../SignUpScreen/SignUpScreen.js'
import Footer from '../Footer/Footer.js'

//Test stuff
import Test from '../TestScreen/TestScreen.js'


//Authentication rerouting
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const App = (props) => (
  <div className="App">
    <NewPostModal />
    <Overlay />
    <Header />
    <PrivateRoute exact path="/" component={PostsScreen} />
    <PrivateRoute path="/map" component={MapScreen} />
    <PrivateRoute path="/likes" component={LikeScreen} />
    <PrivateRoute path="/profile" component={ProfileScreen} />
    <Route path='/login' component={LoginScreen} />
    <Route path='/signup' component={SignUpScreen} />
    <Route path='/test' component={Test} />
    <Footer />
  </div>
)

// App.propTypes = {
//   children: PropTypes.object.isRequired
// };

export default App
