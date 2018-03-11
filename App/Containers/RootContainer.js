// Import Library
import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import {BackHandler} from 'react-native'

import Login from './Login'
import Home from './Home'
import AccountLender from './AccountLender'
import DepositLender from './DepositLender'
import DebtBorrower from './DebtBorrower'

class RootContainer extends Component {
  render () {
    return (
      <Router>
        <Scene key='root' hideNavBar >
            <Scene key='Login' component={Login} title='Login' panHandlers={null} initial />
            <Scene key='Home' component={Home} title='Home' panHandlers={null} />
            <Scene key='AccountLender' component={AccountLender} title='AccountLender' panHandlers={null} />
            <Scene key='DepositLender' component={DepositLender} title='DepositLender' panHandlers={null} />
            <Scene key='DebtBorrower' component={DebtBorrower} title='DebtBorrower' panHandlers={null} />
        </Scene>
      </Router>
      )
    }
}

export default RootContainer
