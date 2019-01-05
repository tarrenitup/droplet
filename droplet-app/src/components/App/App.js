import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom';
import Header from '../Header/Header.js'
import HomeScreen from '../HomeScreen/HomeScreen.js'
import MapScreen from '../MapScreen/MapScreen.js'
import NewScreen from '../NewScreen/NewScreen.js'
import LikeScreen from '../LikeScreen/LikeScreen.js'
import ProfileScreen from '../ProfileScreen/ProfileScreen.js'
import Footer from '../Footer/Footer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path='/' component={HomeScreen} />
        <Route path='/map' component={MapScreen} />
        <Route path='/new' component={NewScreen} />
        <Route path='/likes' component={LikeScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Footer />
      </div>
    );
  }
}

export default App;
