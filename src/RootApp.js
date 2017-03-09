import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './ConfigureStore';
import App from './App';

class RootApp extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
       <App />
      </Provider>
    );
  }
}

export default RootApp;
