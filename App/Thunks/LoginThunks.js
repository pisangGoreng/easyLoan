// import axios from 'axios'
import api from '../Services/Api'
import {Alert} from 'react-native'

// import Action Redux
import { loginRequestAction } from '../Actions'


async function  nyoba () {
  let response = await api.create()
                          .validate()
                          .then((response) => response.data)
                          .then((responseBody) => console.tron.log(responseBody))
                          .catch((error) => console.tron.log(error))
  
  console.tron.log(response)
  return response
  
}


export const loginRequestThunk = (input) => {
  // let response = await api.create()
  //                         .validate()
  //                         .then((response) => response.data)
  //                         .then((responseBody) => responseBody)
  //                         .catch((error) => error)
  
  // if (response !== null) {
  //   console.tron.log(['response', response])
  //   return dispatch => {dispatch(loginRequestAction(response))}
  // } else {
  //   console.tron.log(['error', response])
  //   return dispatch => {dispatch(loginRequestAction(response))}
  // }
  nyoba()
    // .then((response) => console.tron.log(['oko', response]))
    // .catch(err => console.tron.log(err))
  return dispatch => {dispatch(loginRequestAction('kucing'))}
}

