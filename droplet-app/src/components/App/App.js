import React from 'react'
import PropTypes from 'prop-types';
import './App.css'
import { Route } from 'react-router'

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

const App = (props) => (
  <div className="App">
    <NewPostModal />
    <Overlay />
    <Header />
    <Route exact path="/" component={PostsScreen} />
    <Route path="/map" component={MapScreen} />
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

export default App
