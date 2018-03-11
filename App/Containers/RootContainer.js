// Import Library
import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import {BackHandler} from 'react-native'

import Login from './Login'

class RootContainer extends Component {
  // for handling navigation
  // componentWillMount () {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  // }

  // handleBackButton() {
  //   return true
  // }

  render () {
    return (
      <Router>
        <Scene key='root' hideNavBar >
            <Scene key='Login' component={Login} title='Login' panHandlers={null} initial />
        </Scene>
      </Router>
      )
    }
}

export default RootContainer
