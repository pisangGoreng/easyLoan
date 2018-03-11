import { combineReducers } from 'redux'
import LoginReducers from './LoginReducers'

const rootReducers = combineReducers({
    LoginReducers: LoginReducers
})

export default rootReducers
