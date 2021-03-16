import firebase from 'firebase'
import 'firebase/storage';

/*Your web app's Firebase configuration
For Firebase JS SDK v7.20.0 and later, measurementId is optional*/
let firebaseConfig = {
  apiKey: "AIzaSyCS-2-RPAaVoHZHW1QbH6-4vQ2ad7t7HG0",
  authDomain: "junkyard-7d8d0.firebaseapp.com",
  databaseURL: "https://junkyard-7d8d0-default-rtdb.firebaseio.com",
  projectId: "junkyard-7d8d0",
  storageBucket: "junkyard-7d8d0.appspot.com",
  messagingSenderId: "365185991149",
  appId: "1:365185991149:web:ffc523e9902dab67a927e4",
  measurementId: "G-BM3RV2KDFG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create DB instance
let firebaseDB = firebase.database();


// Create storage instance
let firebaseStorage = firebase.storage().ref();

export {
  firebaseStorage,
  firebaseDB as default}
