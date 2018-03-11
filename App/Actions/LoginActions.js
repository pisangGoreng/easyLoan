import * as ActionTypes from './Constants'

export const loginRequestAction = (data) => {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: data
  }
}

export const requestLogin = () => {
  return {
    type: ActionTypes.REQUEST_LOGIN,
    payload: ''
  }
}

export const failureLogin = () => {
  return {
    type: ActionTypes.FAILURE_LOGIN,
    payload: ''
  }
}

