import React, { Component } from 'react'
import {AppRegistry} from 'react-native'
import { Provider } from 'react-redux'

import store from '../Store'
import RootContainer from './RootContainer'

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}