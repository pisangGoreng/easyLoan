import { applyMiddleware } from 'redux'
import Reactotron from 'reactotron-react-native'
import thunk from 'redux-thunk'

import rootReducers from '../Reducers'
const store = Reactotron.createStore(rootReducers, applyMiddleware(thunk))

export default store
