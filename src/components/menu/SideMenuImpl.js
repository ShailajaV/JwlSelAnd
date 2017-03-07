import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import { Actions } from 'react-native-router-flux';
import { BackgroundImage, Header } from '../common';
import Menu from './Menu';

class SideMenuImpl extends Component {
  state = {
      isOpen: false,
      selectedItem: 'About',
  };

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
      console.log('this.is.togglest ', this.state.isOpen);
    this.setState({
      isOpen: !this.state.isOpen,
    });
    console.log('this.is.toggle ', this.state.isOpen);
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
      <BackgroundImage>
      <Header headerText='Toggle' onPress={() => this.toggle()} />
      </BackgroundImage>
      </SideMenu>

    );
  }
}

export default SideMenuImpl;
