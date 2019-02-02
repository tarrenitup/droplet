import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'

import Header from '../Header/Header.js'
import Content from '../Content/Content.js'
import Footer from '../Footer/Footer.js'

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  </Router>
)

export default App;
