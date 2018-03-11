import * as ActionTypes from './Constants'

export const loginRequestAction = (userData, goToScene) => {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: {
      userData,
      goToScene
    }
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

export const fetchAllLenderData = (data) => {
  return {
    type: ActionTypes.FETCH_ALL_LENDER_DATA,
    payload: data
  }
}

