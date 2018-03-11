// Import Library
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {View, Text, TouchableOpacity} from 'react-native'
import TextField from 'react-native-md-textinput'
import { connect } from 'react-redux'

import {Colors, FontSize} from '../Themes'
import api from '../Services/Api'
import { loginRequestThunk } from '../Thunks'

class Login extends Component {
  componentDidMount () {
    // let self = this
    // async function  nyoba () {
    //   let response = await api.create()
    //                           .validate()
    //                           .then((response) => response.data)
    //                           .then((responseBody) => responseBody)
    //                           .catch((error) => error)
      
    //   if (response !== null) {
    //     self.props.loginRequestThunk(response)
    //   } else {
    //     Alert.alert('Sorry, problem with connection')
    //     console.tron.log(['error', response])
    //   }
    // }

    // nyoba()
    this.props.loginRequestThunk('')
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{backgroundColor: Colors.background, flex: 1}}>
          <View style={{marginHorizontal: 20, marginTop: 100}}>
            <Text style={{alignSelf: 'center', fontSize: FontSize.header}}>Welome</Text>
            <TextField label={'Username'} highlightColor={Colors.greenBlue} />
            <TextField label={'Password'} highlightColor={Colors.greenBlue} />
          </View>

          <View style={{marginHorizontal: 20, marginTop: 40}}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.green, width: '100%', height: 40, borderRadius: 5, marginVertical: 10}}>
              <Text style={{color: Colors.white}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.green, width: '100%', height: 40, borderRadius: 5, marginVertical: 10}}>
              <Text style={{color: Colors.white}}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequestThunk: (input) => dispatch(loginRequestThunk(input))
  }
}

export default connect(null, mapDispatchToProps)(Login)

