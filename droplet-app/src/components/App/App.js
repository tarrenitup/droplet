import React, { Component } from 'react'
import './App.css'
import Header from '../Header/Header.js'
import ScreenSlider from '../ScreenSlider/ScreenSlider.js'
import Footer from '../Footer/Footer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ScreenSlider />
        <Footer />
      </div>
    );
  }
}

export default App;
