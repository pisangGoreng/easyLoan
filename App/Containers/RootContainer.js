// Import Library
import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import {BackHandler} from 'react-native'

import Login from './Login'
import Home from './Home'

class RootContainer extends Component {
  render () {
    return (
      <Router>
        <Scene key='root' hideNavBar >
            <Scene key='Login' component={Login} title='Login' panHandlers={null} initial />
            <Scene key='Home' component={Home} title='Home' panHandlers={null} />
        </Scene>
      </Router>
      )
    }
}

export default RootContainer
