
import {Alert} from 'react-native'
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'

// import Action Redux
import { loginRequestAction, requestLogin, failureLogin, fetchAllLenderData } from '../Actions'


var ref = firebase.database().ref("/users")

export const loginRequestThunk = (username, password, goToScene) => {
  return dispatch => {
    dispatch(requestLogin())
    ref
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then(snapshot => {
      let tempValue = snapshot.val()

      tempValue.forEach((element, index) => {
        if (element !== null) {
          let value = tempValue[index]
          if (value !== null && value.username === username && value.username === password) {
            dispatch(loginRequestAction(value, goToScene))
            return false
          }
        } 
      })
      dispatch(failureLogin())
    })
  }
}

export const closedTransactionThunk = (dataUser, transaction, goToScene) => {
  return dispatch => {
    firebase.database().ref(`users/${dataUser.id - 1}/transactionAsLender/${transaction.id - 1}`).update({amount: 999, finished: true}, (response) => {
      ref
        .orderByChild('username')
        .equalTo(dataUser.username)
        .once('value')
        .then(snapshot => {
          let tempValue = snapshot.val()

          tempValue.forEach((element, index) => {
            if (element !== null) {
              let value = tempValue[index]
              if (value !== null && value.username === dataUser.username && value.username === dataUser.password) {
                dispatch(loginRequestAction(value, goToScene))
                return false
              }
            } 
          })
          dispatch(failureLogin())
        })
    })
  }
}

export const addDepositThunk = (dataUser, depositAmount, goToScene) => {
  let totalBalance = Number(dataUser.balance) + Number(depositAmount)
  return dispatch => {
    firebase.database().ref(`users/${dataUser.id - 1}`).update({balance: totalBalance}, (response) => {
      ref
        .orderByChild('username')
        .equalTo(dataUser.username)
        .once('value')
        .then(snapshot => {
          let tempValue = snapshot.val()

          tempValue.forEach((element, index) => {
            if (element !== null) {
              let value = tempValue[index]
              if (value !== null && value.username === dataUser.username && value.username === dataUser.password) {
                dispatch(loginRequestAction(value, goToScene))
                Actions.AccountLender({type: 'reset'})
                return false
              }
            } 
          })
          dispatch(failureLogin())
        })
    })
  }
}

export const getAllLenderDataThunk = () => {
  return dispatch => {
    ref
      .orderByChild('role')
      .equalTo('lender')
      .once('value')
      .then(snapshot => {
        let tempValue = snapshot.val()
        let allLender = []
        tempValue.forEach((element, index) => {
          if (element !== null) {
            let value = tempValue[index]
            if (value !== null && value.role === 'lender') {
              allLender.push(value)
            }
          } 
        })
        dispatch(fetchAllLenderData(allLender))
        return false
      })
  }
}
