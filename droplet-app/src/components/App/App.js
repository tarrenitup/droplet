import React, { Component } from 'react'
import './App.css'
import Header from '../Header/Header.js'
import SampleScreen from '../SampleScreen/SampleScreen.js'
import Footer from '../Footer/Footer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SampleScreen />
        <Footer />
      </div>
    );
  }
}

export default App;
