import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCP1wlIxiqFnbfE0OevMxqmgk1v6mzaViA',
  authDomain: 'react-chat-76f89.firebaseapp.com',
  databaseURL: 'https://react-chat-76f89.firebaseio.com',
  projectId: 'react-chat-76f89',
  storageBucket: 'react-chat-76f89.appspot.com',
  messagingSenderId: '483575731254',
  appId: '1:483575731254:web:5eaf0176da238c9b'
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
