// Import Library
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {View, Text, TouchableOpacity, Alert} from 'react-native'
import TextField from 'react-native-md-textinput'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import { Actions } from 'react-native-router-flux'

import {Colors, FontSize} from '../Themes'
import api from '../Services/Api'
import { loginRequestThunk } from '../Thunks'
import Styles from './Styles/LoginStyles'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: false
    }
  }

  render () {
    const {username, password, isLoading} = this.state
    return (
      <View>
        <Text>ojk</Text>
      </View>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    login: state.LoginReducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequestThunk: (username, password) => dispatch(loginRequestThunk(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

