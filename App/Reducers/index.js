import { combineReducers } from 'redux'
import UserReducers from './UserReducers'

const rootReducers = combineReducers({
    UserReducers: UserReducers
})

export default rootReducers
