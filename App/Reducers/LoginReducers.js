import * as ActionTypes from '../Actions/Constants'

let initState = {
  dataUser: {
    'username': '',
    'transaction': [],
    'role': '',
    'password': '',
    'name': '',
    'id': '',
    'profit': '',
    'balance': ''
  },
  isFetching: false,
  error: null
}

const LoginReducers = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST: {
      return {...state, dataUser: action.payload, isFetching: false}
    }

    case ActionTypes.REQUEST_LOGIN: {
      return {...state, isFetching: true}
    }

    case ActionTypes.FAILURE_LOGIN: {
      return {...state, isFetching: false, error: 'login failed'}
    }


    default: {
      return state
    }
  }
}

export default LoginReducers