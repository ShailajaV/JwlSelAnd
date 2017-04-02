/* Welcome file which starts rendering the app */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './ConfigureStore';
import Router from './Router';

class App extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
