// Import Library
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {View, Text, TouchableOpacity, Alert} from 'react-native'
import TextField from 'react-native-md-textinput'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import { Actions } from 'react-native-router-flux'
import { Dropdown } from 'react-native-material-dropdown'

import {Colors, FontSize} from '../Themes'
import api from '../Services/Api'
import { addDepositThunk } from '../Thunks'
import Styles from './Styles/LoginStyles'
import LocaleFormatter from '../Services/LocaleFormatter'

class DebtBorrower extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataUser: this.props.login.dataUser,
      dataLender: this.props.login.dataLender,
      borrowerAmount: 0,
      perriodTime: null,
      chooseLender: null
    }
  }

  borrowMoney () {
    const {dataUser, borrowerAmount} = this.state
    this.props.addDepositThunk(dataUser, borrowerAmount, 'AccountLender')
  }

  render () {
    const {dataUser, borrowerAmount, dataLender} = this.state
    console.tron.log(this.state)

    let perriod = [{
      value: 3,
    }, {
      value: 6,
    }, {
      value: 9,
    }]

    let lender = []
    dataLender.map(((data, index) => {
      lender.push({
        value: `${data.username} - Balance: ${LocaleFormatter.numberToCurrency(data.balance)}`
      })
    }))

    return (
      <View style={{backgroundColor: Colors.softBlue, flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1, alignItems: 'center', paddingTop: 40}}>
            <Text>want borrow some money</Text>
            <Text>{LocaleFormatter.numberToCurrency(Number(borrowerAmount))}</Text>
            <View style={{width: '90%', height: 100}}>
              <TextField
                label={'Borrower Amount'}
                ref='borrowerAmount'
                highlightColor={Colors.greenBlue}
                keyboardType={'numeric'}
                value={borrowerAmount}
                onChangeText={(borrowerAmount) => this.setState({borrowerAmount})}
                onSubmitEditing={() => this.borrowMoney()}
              />

              <Dropdown
                label='Perriod Time'
                data={perriod}
                onChangeText={(value, index, data) => this.setState({perriodTime: value}) }
              />

              <Dropdown
                label='Lender'
                data={lender}
                onChangeText={(value, index, data) => this.setState({chooseLender: dataLender[index]}) }
              />
            </View>

            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center', width: 80, height: 40, top: 140, backgroundColor: Colors.grey}}
              onPress={() => this.borrowMoney()}
            >
              <Text>Process</Text>
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
    addDepositThunk: (dataUser, borrowerAmount, goToScene) => dispatch(addDepositThunk(dataUser, borrowerAmount, goToScene))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DebtBorrower)

