/* Welcome file which starts rendering the app */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
//import { View } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { BackgroundImage } from './components/common';

import Router from './Router';
import configureStore from './ConfigureStore';

class App extends Component {
  
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyDFmxMQ6Fp55hh6RQiaUuIHsUYDlTKySZc',
    authDomain: 'jewellery-ece6f.firebaseapp.com',
    databaseURL: 'https://jewellery-ece6f.firebaseio.com',
    storageBucket: 'jewellery-ece6f.appspot.com',
    messagingSenderId: '601320078334'
    };
  firebase.initializeApp(config);
  }

  render() {
    const store = configureStore();

    return (
      <BackgroundImage>
        <Provider store={store}>
         <Router />
        </Provider>
      </BackgroundImage>
    );
  }
}

export default App;
