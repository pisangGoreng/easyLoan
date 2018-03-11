import * as ActionTypes from './Constants'

export const loginRequestAction = (data) => {
  return {
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: data
  }
}
