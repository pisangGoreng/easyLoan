// import axios from 'axios'
import api from '../Services/Api'
import {Alert} from 'react-native'
import firebase from 'react-native-firebase'

// import Action Redux
import { loginRequestAction, requestLogin, failureLogin } from '../Actions'


async function  nyoba () {
  let response = await api.create()
                          .validate()
                          .then((response) => response.data)
                          .then((responseBody) => console.tron.log(responseBody))
                          .catch((error) => console.tron.log(error))
  return response
}


var ref = firebase.database().ref("/users")

export const loginRequestThunk = (username, password) => {
  return dispatch => {
    dispatch(requestLogin())
    ref
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then(snapshot => {
      let tempValue = snapshot.val()
      let value = tempValue[0]
      if (value !== null && value.username === username && value.username === password) {
        dispatch(loginRequestAction(value))
      } else {
        dispatch(failureLogin())
      }
    })
  }
}

