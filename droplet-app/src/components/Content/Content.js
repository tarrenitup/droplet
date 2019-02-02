import React from 'react'
import './Content.css'
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import HomeScreen from '../HomeScreen/HomeScreen.js'
import MapScreen from '../MapScreen/MapScreen.js'
import NewScreen from '../NewScreen/NewScreen.js'
import LikeScreen from '../LikeScreen/LikeScreen.js'
import ProfileScreen from '../ProfileScreen/ProfileScreen.js'

const Content = ({location}) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{ enter: 300, exit: 300 }}
      classNames={'fade'}
    >
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route path='/map' component={MapScreen} />
        <Route path='/new' component={NewScreen} />
        <Route path='/likes' component={LikeScreen} />
        <Route path='/profile' component={ProfileScreen} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

export default withRouter(Content);
