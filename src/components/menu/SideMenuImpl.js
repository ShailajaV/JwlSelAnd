import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import React, { Component } from 'react';
import { Menu } from '../common/Menu';


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
    //this.goToScreen(item);
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
const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

  return (
    <SideMenu
      menu={menu}
      menuPosition={'left'}
      isOpen={this.state.isOpen}
      onChange={(isOpen) => this.updateMenuState(isOpen)}
    />
  );
}
  }

export default SideMenuImpl;
