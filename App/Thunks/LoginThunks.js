
import {Alert} from 'react-native'
import firebase from 'react-native-firebase'
import { Actions } from 'react-native-router-flux'
import LocaleFormatter from '../Services/LocaleFormatter'

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

export const requestBorrowerThunk = (dataUser, borrowerAmount, perriodTime, dataLender, goToScene) => {
  let debtThisTransaction = Number(borrowerAmount) * 2 / 100 * Number(perriodTime)

  return dispatch => {
    // update data for borrower
    let totalDebt = Number(dataUser.debt) + Number(debtThisTransaction)
    let totalBorrower = Number(dataUser.totalBorrower) + Number(borrowerAmount)
  
    let newPostBorrower = {
      debt: totalDebt,
      totalBorrower,
    }
    firebase.database().ref(`users/${dataUser.id - 1}`).update(newPostBorrower)

    // update data for borrower transaction
    firebase.database().ref(`users/${dataUser.id - 1}/transactionAsBorrower`).once('value').then(snapshot => {
      let startMonth = LocaleFormatter.getTodayMonth()
      let lastIndex = snapshot.val().length
      let newTransactionBorrower = {
        id: Number(snapshot.val()[lastIndex - 1].id + 1),
        userId: dataLender.id,
        duration: perriodTime,
        amount: borrowerAmount,
        profit: debtThisTransaction,
        finished: false,
        startMonth, 
        endMonth: LocaleFormatter.calculateEndMonth(startMonth, perriodTime)
      }
      firebase.database().ref(`users/${dataUser.id - 1}/transactionAsBorrower/${lastIndex}`).update(newTransactionBorrower)
    })

    // update data for lender
    let newBalance =  Number(dataLender.balance) - Number(borrowerAmount)
    let profit =  Number(dataLender.profit) + Number(debtThisTransaction)
    let newPostLender = {
      balance: newBalance,
      profit,
    }
    firebase.database().ref(`users/${dataLender.id - 1}`).update(newPostLender)

    // update data for borrower transaction
    firebase.database().ref(`users/${dataLender.id - 1}/transactionAsLender`).once('value').then(snapshot => {
      let startMonth = LocaleFormatter.getTodayMonth()
      let lastIndex = snapshot.val().length
      let newTransactionLender = {
        id: Number(snapshot.val()[lastIndex - 1].id + 1),
        userId: dataLender.id,
        duration: perriodTime,
        amount: borrowerAmount,
        profit: debtThisTransaction,
        finished: false,
        startMonth, 
        endMonth: LocaleFormatter.calculateEndMonth(startMonth, perriodTime)
      }
      firebase.database().ref(`users/${dataLender.id - 1}/transactionAsLender/${lastIndex}`).update(newTransactionLender).then(response => {
        
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
                Actions.AccountBorrower({type: 'reset'})
                return false
              }
            } 
          })
          dispatch(failureLogin())
        })

      })
    })
  } 
}