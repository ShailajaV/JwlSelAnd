import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './components/menu/Menu';
import styles from './components/common/CommonCSS';
import LoginForm from './components/auth/LoginForm';
import SellerProfile from './components/seller/SellerProfile';
import ProductCreate from './components/product/ProductCreate';
import ProductList from './components/product/ProductList';
import ProductEdit from './components/product/ProductEdit';
import { MenuHeader } from './components/common/MenuHeader';
import { logOut } from './actions';

class MainScreen extends Component {
  state = {
    isOpen: false,
    selectedItem: 1,
  };

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderContent() {
    switch (this.state.selectedItem) {
      case 'AccountSettings':
        return <SellerProfile />;
      case 'ProductCreate':
        return <ProductCreate />;
      case 'ProductDetails':
        return <ProductList />;
      case 'Logout':
        this.props.logOut();
        return <SellerProfile />;
      default:
        switch (this.props.item) {
          case 'sellerProfile':
            return <SellerProfile />;
          case 'productCreate':
            return <ProductCreate />;
          case 'productList':
            return <ProductList />;
          case 'productEdit':
            return <ProductEdit />;
          default:
            return <SellerProfile />;
        }
    }
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
      <View style={styles.MenuContainer}>
        {this.renderContent()}
      </View>
      </SideMenu>
    );
  }
}

export default connect(null, { logOut })(MainScreen);
