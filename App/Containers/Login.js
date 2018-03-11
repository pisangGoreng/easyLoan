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
import { loginRequestThunk, getAllLenderDataThunk } from '../Thunks'
import Styles from './Styles/LoginStyles'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: 'b',
      password: 'b',
      isLoading: false
    }
  }

  componentWillReceiveProps (newProps) {
    const {isFetching, error, dataUser, goToScene} = newProps.login
    if (isFetching === false && error === null && goToScene === 'Home') {
      this.toggleLoading()
      Actions.Home()
    }
  }

  toggleLoading () {
    const {isLoading} = this.state
    this.setState({isLoading: !isLoading})
  }

  fetchLogin () {
    const {username, password} = this.state
    this.toggleLoading()
    this.props.loginRequestThunk(username, password, 'Home')
    this.props.getAllLenderDataThunk()
  }

  render () {
    const {username, password, isLoading} = this.state
    return (
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{backgroundColor: Colors.background, flex: 1}}>
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />

          <View style={Styles.TextInputContainer}>
            <Text style={{alignSelf: 'center', fontSize: FontSize.header}}>Welcome</Text>
            <TextField
              label={'Username'}
              ref='username'
              highlightColor={Colors.greenBlue}
              value={username}
              onChangeText={(username) => this.setState({username})}
              onSubmitEditing={() => this.refs.password.focus()}
            />

            <TextField
              label={'Password'}
              ref='password'
              highlightColor={Colors.greenBlue}
              value={password}
              onChangeText={(password) => this.setState({password})}
              onSubmitEditing={() => this.fetchLogin()}
            />
          </View>

          <View style={Styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.fetchLogin()}
              style={Styles.registerButton}
            >
              <Text style={{color: Colors.white}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Styles.registerButton}>
              <Text style={{color: Colors.white}}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    login: state.UserReducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequestThunk: (username, password, goToScene) => dispatch(loginRequestThunk(username, password, goToScene)),
    getAllLenderDataThunk: () => dispatch(getAllLenderDataThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

