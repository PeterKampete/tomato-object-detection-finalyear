import firebase from "firebase/app";
import "firebase/storage";
import 'firebase/auth'


export const firebaseConfig = {
  apiKey: "AIzaSyA90rywUFoZDxwXmJGtUWadJfD8VfSnHkA",
  authDomain: "tomato-detection-54d8d.firebaseapp.com",
  databaseURL: "https://tomato-detection-54d8d-default-rtdb.firebaseio.com",
  projectId: "tomato-detection-54d8d",
  storageBucket: "tomato-detection-54d8d.appspot.com",
  messagingSenderId: "124782614680",
  appId: "1:124782614680:web:bb923a94783771f42398ed",
};


const app = firebase.initializeApp(firebaseConfig);

export default app;