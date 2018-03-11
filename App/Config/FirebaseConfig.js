import firebase from 'react-native-firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCDVfptV4Db3_QzgJXWB5zzcXhQjoLCEXU',
  authDomain: 'easyloan-15170.firebaseapp.com',
  databaseURL: 'https://easyloan-15170.firebaseio.com',
  projectId: 'easyloan-15170',
  storageBucket: 'easyloan-15170.appspot.com',
  messagingSenderId: '288650145512'
}

firebase.initializeApp(config)

export default firebase