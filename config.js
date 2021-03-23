import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyD5854icbpY3K4T4OvKqjaRufUVYe-s7Nc",
    authDomain: "story-hub-6fd5c.firebaseapp.com",
    projectId: "story-hub-6fd5c",
    databaseURL: "https://story-hub-6fd5c.firebaseio.com",
    storageBucket: "story-hub-6fd5c.appspot.com",
    messagingSenderId: "1002592867583",
    appId: "1:1002592867583:web:92342c1db5225c5926e8ca",
    measurementId: "G-5E2PNC0BTS"
  };

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();