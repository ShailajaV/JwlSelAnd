/* Welcome file which starts rendering the app */
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './Router';
import reducers from './reducers';
import { BackgroundImage, Button } from './components/common';
import { Menu } from './components/common/Menu';

class App extends Component {
  state = {
    isOpen: false,
    selectedItem: 'About',
  };
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

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
    this.goToScreen(item);
  }

  goToScreen(route) {
    switch (route) {
      case 'LoginForm':
        return Actions.logIn();
      case 'AccountSettings':
        return Actions.sellerProfile();
      case 'ProductCreate':
        return Actions.productDetails();
      case 'ProductDetails':
        return Actions.productsList();
      case 'ForgotPassword':
        return Actions.forgotPassword();
      default:
        return Actions.logIn();
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <BackgroundImage>
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}
        >
          <Button style={styles.button} onPress={() => this.toggle()}>
            <Image
              source={require('./components/common/images/editimage.png')}
              style={styles.imageStyle}
              resizeMode={Image.resizeMode.sretch}
            />
          </Button>
          <Provider store={store}>
            <Router />
          </Provider>
        </SideMenu>
      </BackgroundImage>
    );
  }
}

const styles = {
  button: {
    position: 'absolute',
    top: 0,
    padding: 2,
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  }
};
export default App;
