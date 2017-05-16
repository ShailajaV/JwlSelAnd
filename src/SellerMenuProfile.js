import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import SellerMenu from './components/menu/SellerMenu';
import styles from './components/common/CommonCSS';
import UserProfile from './components/user/UserProfile';
import ProductCreate from './components/product/ProductCreate';
import ProductList from './components/product/ProductList';
import ProductEdit from './components/product/ProductEdit';
import ChatUsersList from './components/messenger/ChatUsersList';
import ChatUI from './components/messenger/ChatUI';
import { MenuHeader } from './components/common/MenuHeader';
import { logOut } from './actions';

class SellerMenuProfile extends Component {
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
        return <UserProfile />;
      case 'ProductCreate':
        return <ProductCreate />;
      case 'ProductDetails':
        return <ProductList />;
      case 'Chat':
        return <ChatUsersList />;
      case 'Logout':
        this.props.logOut();
        return <UserProfile />;
      default:
        switch (this.props.item) {
          case 'sellerProfile':
            return <UserProfile />;
          case 'productCreate':
            return <ProductCreate />;
          case 'productList':
            return <ProductList />;
          case 'productEdit':
            return <ProductEdit />;
          case 'chat':
            return <ChatUI product={this.props.product} />;
          default:
            return <UserProfile />;
        }
    }
  }

  render() {
    const menu = <SellerMenu onItemSelected={this.onMenuItemSelected} />;
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

export default connect(null, { logOut })(SellerMenuProfile);
