import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAwK4_ChlMAgLDEjXziu_qflzvN5CC6_v8",
    authDomain: "react-native-firebase-f251c.firebaseapp.com",
    projectId: "react-native-firebase-f251c",
    storageBucket: "react-native-firebase-f251c.appspot.com",
    messagingSenderId: "1056601801449",
    appId: "1:1056601801449:web:17005f55863aad0065a678"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
      firebase,
      db,
  }