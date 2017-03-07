/* Welcome file which starts rendering the app */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import SideMenu from 'react-native-side-menu';
import { View } from 'react-native';
import { BackgroundImage, MenuHeader, Header } from './components/common';
import { Menu } from './components/menu/Menu';
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
const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <BackgroundImage>
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}
        >
        <View>
        <Header headerText='Toggle' onPress={() => this.toggle()} />
        <View style={{ backgroundColor: '#1abc9c' }}>
        <MenuHeader headerText='Toggle' onPress={() => this.toggle()} />
        </View>
        </View>
        <Provider store={store}>
         <Router />
        </Provider>
        </SideMenu>
        </BackgroundImage>
    );
  }
}

export default App;
