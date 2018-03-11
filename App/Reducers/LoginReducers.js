import * as ActionTypes from '../Actions/Constants'

const LoginReducers = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST: {
      console.tron.log(['isis reducder ni'])
      // return Object.assign({}, action.payload)
      return state
    }
    default: {
      return state
    }
  }
}

export default LoginReducers