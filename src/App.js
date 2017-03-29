/* Welcome file which starts rendering the app */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import { Actions } from 'react-native-router-flux';
import { firebaseAuth } from './FirebaseConfig';
import { MenuHeader } from './components/common';
import Menu from './components/menu/Menu';
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
        if (this.state.isLoggedIn) {
          return Actions.sellerProfile();
        }
        this.toggle();
        return null;
      case 'ProductCreate':
      if (this.state.isLoggedIn) {
        return Actions.productDetails();
      }
      this.toggle();
      return null;
      case 'ProductDetails':
      if (this.state.isLoggedIn) {
        return Actions.productsList();
      }
      this.toggle();
      return null;
      case 'ForgotPassword':
        return Actions.forgotPassword();
      case 'Logout':
        return this.props.logOut();
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
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
      >
        <MenuHeader headerText='Toggle' onPress={() => this.toggle()} />
        <Router />
      </SideMenu>
    );
  }
}

export default connect(null, { logOut })(App);
