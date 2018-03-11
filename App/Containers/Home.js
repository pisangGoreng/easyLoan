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
      dataUser: this.props.login.dataUser
    }
  }

  navigateToAccountScene () {
    const {dataUser} = this.state
    if (dataUser.role === 'lender') {
      Actions.AccountLender()
    }
  }

  navigateToTransactionScene () {
    const {dataUser} = this.state
    if (dataUser.role === 'lender') {
      Actions.DepositLender()
    } else {
      Actions.DebtBorrower()
    }
  }

  render () {
    const {dataUser} = this.state
    const transactionType = dataUser.role === 'lender' ? 'Deposit' : 'Borrow'
    return (
      <View style={{backgroundColor: Colors.background, flex: 1}}>
        <View style={{flex: 1, backgroundColor: Colors.softGreen, justifyContent: 'flex-end', padding: 10}}>
          <Text style={{fontSize: 20, color: Colors.white}}>EasyLoan</Text>
          <Text style={{fontSize: 12, color: Colors.white}}>Mudah pinjam nya, tanpa perlu dibayar</Text>
        </View>

        <TouchableOpacity
          style={{flex: 2, backgroundColor: Colors.softBlue, justifyContent: 'flex-end', padding: 10}}
          onPress={() => this.navigateToTransactionScene()}
        >
          <Text style={{fontSize: 20, color: Colors.white}}>{transactionType}</Text>
          <Text style={{fontSize: 12, color: Colors.white}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quae sunt dignissimos, ipsum veritatis assumenda.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{flex: 2, backgroundColor: Colors.softYellow, justifyContent: 'flex-end', padding: 10}}
          onPress={() => this.navigateToAccountScene()}
        >
          <Text style={{fontSize: 20, color: Colors.white}}>Account</Text>
          <Text style={{fontSize: 12, color: Colors.white}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quae sunt dignissimos, ipsum veritatis assumenda.</Text>
        </TouchableOpacity>
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

