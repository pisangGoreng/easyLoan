import Reactotron, { asyncStorage } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

Reactotron
.configure()
.useReactNative()
.use(asyncStorage()) 
.use(reactotronRedux())
.connect()

Reactotron.clear()
console.tron = Reactotron
