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
  dataLender: [],
  isFetching: false,
  error: null,
  goToScene: null
}

const UserReducers = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST: {
      return {...state, dataUser: action.payload.userData, isFetching: false, goToScene: action.payload.goToScene}
    }

    case ActionTypes.REQUEST_LOGIN: {
      return {...state, isFetching: true}
    }

    case ActionTypes.FAILURE_LOGIN: {
      return {...state, isFetching: false, error: 'login failed'}
    }

    case ActionTypes.FETCH_ALL_LENDER_DATA: {
      return {...state, dataLender: action.payload}
    }

    default: {
      return state
    }
  }
}

export default UserReducers