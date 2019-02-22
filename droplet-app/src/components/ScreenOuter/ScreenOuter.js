import React from 'react'
import './ScreenOuter.css'
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import HomeScreen from '../HomeScreen/HomeScreen.js'
import MapScreen from '../MapScreen/MapScreen.js'
import NewScreen from '../NewScreen/NewScreen.js'
import LikeScreen from '../LikeScreen/LikeScreen.js'
import ProfileScreen from '../ProfileScreen/ProfileScreen.js'
import LoginScreen from '../LoginScreen/LoginScreen.js'

const ScreenOuter = ({ location }) => (
    <TransitionGroup className="transition-group">
        <CSSTransition
            key={location.key}
            timeout={{ enter: 400, exit: 400 }}
            classNames={'fade'}
        >
            <section className="route-section">
                <Switch location={location}>
                    <Route exact path='/' component={HomeScreen} />
                    <Route path='/map' component={MapScreen} />
                    <Route path='/new' component={NewScreen} />
                    <Route path='/likes' component={LikeScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/login' component={LoginScreen} />
                </Switch>
            </section>
        </CSSTransition>
    </TransitionGroup>
)

export default withRouter(ScreenOuter);
