import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA90rywUFoZDxwXmJGtUWadJfD8VfSnHkA",
  authDomain: "tomato-detection-54d8d.firebaseapp.com",
  databaseURL: "https://tomato-detection-54d8d-default-rtdb.firebaseio.com",
  projectId: "tomato-detection-54d8d",
  storageBucket: "tomato-detection-54d8d.appspot.com",
  messagingSenderId: "124782614680",
  appId: "1:124782614680:web:bb923a94783771f42398ed",
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
