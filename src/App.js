/* Welcome file which starts rendering the jewellery app */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
    apiKey: 'AIzaSyDlzOFjr42Y9kKsUrxs0aHugAHluGnxOdE',
    authDomain: 'jewellery-6470b.firebaseapp.com',
    databaseURL: 'https://jewellery-6470b.firebaseio.com',
    storageBucket: 'jewellery-6470b.appspot.com',
    messagingSenderId: '1038743319418'
    };
  firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
