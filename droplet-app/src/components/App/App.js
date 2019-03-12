import React from 'react'
import PropTypes from 'prop-types';
import './App.css'
import { Route } from 'react-router'

import Header from '../Header/Header.js'
import PostsScreen from '../PostsScreen/PostsScreen.js'
import MapScreen from '../MapScreen/MapScreen.js'
import NewScreen from '../NewScreen/NewScreen.js'
import LikeScreen from '../LikeScreen/LikeScreen.js'
import ProfileScreen from '../ProfileScreen/ProfileScreen.js'
import LoginScreen from '../LoginScreen/LoginScreen.js'
import SignUpScreen from '../SignUpScreen/SignUpScreen.js'
import Footer from '../Footer/Footer.js'


//Test stuff
import Test from '../TestScreen/Test.js'

const App = (props) => (
  <div className="App">
    <Header />
    <Route exact path="/" component={PostsScreen} />
    <Route path="/map" component={MapScreen} />
    <Route path="/new" component={NewScreen} />
    <Route path="/likes" component={LikeScreen} />
    <Route path="/profile" component={ProfileScreen} />
    <Route path='/login' component={LoginScreen} />
    <Route path='/signup' component={SignUpScreen} />
    <Route path='/test' component={Test} />
    <Footer />
  </div>
)

// App.propTypes = {
//   children: PropTypes.object.isRequired
// };

export default App;
