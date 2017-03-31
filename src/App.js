/* Welcome file which starts rendering the app */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseAuth } from './FirebaseConfig';
import Router from './Router';
import { logOut } from './actions';

class App extends Component {
  state = {
      isOpen: false,
      selectedItem: 'LoginForm',
      isLoggedIn: false
  };

  componentWillMount() {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
     return (
      <Router />
    );
  }
}

export default connect(null, { logOut })(App);
