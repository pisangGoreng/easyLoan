// Import Library
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {View, Text, TouchableOpacity, Alert} from 'react-native'
import TextField from 'react-native-md-textinput'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'
import { Actions } from 'react-native-router-flux'
import Accordion from 'react-native-collapsible/Accordion'

import {Colors, FontSize} from '../Themes'
import { closedTransactionThunk } from '../Thunks'
import Styles from './Styles/LoginStyles'
import LocaleFormatter from '../Services/LocaleFormatter'

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...'
  }
]


class AccountLender extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataUser: this.props.login.dataUser,
      estimatedProfit: 0,
      totalMoneyLended: 0
    }
  }

  componentWillReceiveProps (newProps) {
    const {goToScene} = newProps.login
    if (goToScene === 'AccountLender') {
      Actions.AccountLender({type: 'reset'})
    }
  }

  componentWillMount () {
    this.forceUpdate()
    this.calculateTransaction()
  }

  calculateTransaction () {
    const {dataUser} = this.state
    let estimatedProfit = 0
    let totalMoneyLended = 0
    dataUser.transactionAsLender.map(transaction => {
      if (transaction.finished === false) {
        estimatedProfit = Number(estimatedProfit) + Number(transaction.profit)
        totalMoneyLended = Number(totalMoneyLended) + Number(transaction.amount)
      }
    })
    this.setState({estimatedProfit, totalMoneyLended})
  }

  _renderHeader(title) {
    return (
      <View style={{width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.grey, marginVertical: 15}}>
        <Text style={{color: Colors.white}}>{title}</Text>
      </View>
    );
  }

  _renderContent(data, status) {
    return (
      <View>
        <View style={{flexDirection: 'row', height: 40}}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: 25, borderWidth: 0.3}}>
            <Text>No</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', width: 70, borderWidth: 0.3}}>
            <Text>Amount</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center', width: 60, borderWidth: 0.3}}>
            <Text>Profit</Text>
          </View>
          
          <View style={{alignItems: 'center', justifyContent: 'center', width: 65, borderWidth: 0.3}}>
            <Text>Start</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center', width: 65, borderWidth: 0.3}}>
            <Text>End</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center', width: 60, borderWidth: 0.3}}>
            <Text>Period</Text>
          </View>
        </View>
        { 
          status === 'open' 
          ? (data.map((transaction, index) => {
              return transaction.finished === false && this.renderTransactionDetail(transaction, index)
            }))
          : status === 'closed' 
            ? (data.map((transaction, index) => {
                return transaction.finished === true && this.renderTransactionDetail(transaction, index)
              }))
            : (data.map((transaction, index) => {
                if (transaction.finished === false && transaction.endMonth === LocaleFormatter.getTodayMonth()) {
                  return this.renderTransactionDetail(transaction, index, 'showClosedButton')
                }
              }))
        }
      </View>
    );
  }

  renderTransactionDetail(transaction, index, showClosedButton) {
    return (
      <View>
        <View style={{flexDirection: 'row', height: 40}}>
          <View style={{alignItems: 'center', justifyContent: 'center', width: 25, borderWidth: 0.3}}>
            <Text style={{fontSize: 10}}>{index + 1}</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', width: 70, borderWidth: 0.3}}>
            <Text style={{fontSize: 10}}>{LocaleFormatter.numberToCurrency(transaction.amount)}</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center', width: 60, borderWidth: 0.3}}>
            <Text style={{fontSize: 10}}>{LocaleFormatter.numberToCurrency(transaction.profit)}</Text>
          </View>
          
          <View style={{alignItems: 'center', justifyContent: 'center', width: 65, borderWidth: 0.3}}>
            <Text style={{fontSize: 10}}>{LocaleFormatter.getMonth(transaction.startMonth)}</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center', width: 65, borderWidth: 0.3}}>
            <Text style={{fontSize: 10}}>{LocaleFormatter.getMonth(transaction.endMonth)}</Text>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center', width: 60, borderWidth: 0.3}}>
            <Text style={{fontSize: 10}}>{transaction.duration} Month</Text>
          </View>
        </View>
        
        {
          showClosedButton &&
            <TouchableOpacity
              onPress={() => this.closedTransaction(transaction)}
              style={{justifyContent: 'center', alignItems: 'center', height: 40, borderWidth: 0.3}}
            >
              <Text>Close this transaction...</Text>
            </TouchableOpacity>
        }

      </View>
    )
  }

  closedTransaction(transaction) {
    const {dataUser} = this.state
    this.props.closedTransactionThunk(dataUser, transaction, 'AccountLender')
  }

  render () {
    const {dataUser, estimatedProfit, totalMoneyLended} = this.state
    console.tron.log(dataUser.transactionAsLender)
    return (
      <View style={{backgroundColor: Colors.softYellow, flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text>Hi.. {dataUser.name}</Text>

            <Text>Right now you have:</Text>
            <Text>Balance:{LocaleFormatter.numberToCurrency(dataUser.balance)}</Text>
            <Text>Total Money Lended:{LocaleFormatter.numberToCurrency(totalMoneyLended)}</Text>
            <Text>Estimated Profit:{LocaleFormatter.numberToCurrency(estimatedProfit)}</Text>

            <Text>Transaction Detail:</Text>
            <Accordion
              sections={SECTIONS}
              underlayColor={'white'}
              renderHeader={() =>this. _renderHeader('Open Transaction')}
              renderContent={() => this._renderContent(dataUser.transactionAsLender, 'open')}
            />

            <Accordion
              sections={SECTIONS}
              underlayColor={'white'}
              renderHeader={() =>this. _renderHeader('Closed Transaction')}
              renderContent={() => this._renderContent(dataUser.transactionAsLender, 'closed')}
            />

            <Accordion
              sections={SECTIONS}
              underlayColor={'white'}
              renderHeader={() =>this. _renderHeader('Finished Transaction')}
              renderContent={() => this._renderContent(dataUser.transactionAsLender, 'finished')}
            />

            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center', width: 80, height: 40, marginTop: 20, backgroundColor: Colors.grey}}
              onPress={() => Actions.Login({type: 'reset'})}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
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
    closedTransactionThunk: (dataUser, transaction, goToScene) => dispatch(closedTransactionThunk(dataUser, transaction, goToScene))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountLender)

