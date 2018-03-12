// Import Library
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {View, Text, TouchableOpacity, Alert, BackHandler} from 'react-native'
import TextField from 'react-native-md-textinput'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import { Actions } from 'react-native-router-flux'
import Accordion from 'react-native-collapsible/Accordion'

import {Colors, FontSize} from '../Themes'
import api from '../Services/Api'
import { addDepositThunk } from '../Thunks'
import Styles from './Styles/LoginStyles'
import LocaleFormatter from '../Services/LocaleFormatter'

class DepositLender extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataUser: this.props.login.dataUser,
      depositAmount: 0
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid())
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid())
  }

  backAndroid () {
    Actions.Home({type: 'reset'})
    return true
  }

  addDeposit () {
    const {dataUser, depositAmount} = this.state
    this.props.addDepositThunk(dataUser, depositAmount, 'AccountLender')
  }

  render () {
    const {dataUser, depositAmount} = this.state
    console.tron.log(this.state)
    return (
      <View style={{backgroundColor: Colors.softBlue, flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Deposit to your account</Text>
            <Text>{LocaleFormatter.numberToCurrency(Number(depositAmount))}</Text>
            <View style={{width: '90%', height: 60}}>
              <TextField
                label={'Deposit Amount'}
                ref='depositAmount'
                highlightColor={Colors.greenBlue}
                keyboardType={'numeric'}
                value={depositAmount}
                onChangeText={(depositAmount) => this.setState({depositAmount})}
                onSubmitEditing={() => this.addDeposit()}
              />
            </View>

            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center', width: 80, height: 40, marginTop: 20, backgroundColor: Colors.grey}}
              onPress={() => this.addDeposit()}
            >
              <Text>Deposit</Text>
            </TouchableOpacity>
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
    addDepositThunk: (dataUser, depositAmount, goToScene) => dispatch(addDepositThunk(dataUser, depositAmount, goToScene))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositLender)

