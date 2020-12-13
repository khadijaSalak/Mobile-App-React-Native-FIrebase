import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCIvAb7U1cS3XHljFzjR5M0xSFWn1PsYuc",
  authDomain: "doctoors.firebaseapp.com",
  databaseURL: "https://doctoors.firebaseio.com",
  projectId: "doctoors",
  storageBucket: "doctoors.appspot.com",
  messagingSenderId: "911605886134",
  appId: "1:911605886134:web:845dac5e6b069a367a0a17",
  measurementId: "G-B36DDHNVT2"
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
