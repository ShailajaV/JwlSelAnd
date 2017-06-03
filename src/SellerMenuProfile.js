import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import SellerMenu from './components/menu/SellerMenu';
import styles from './components/common/CommonCSS';
import SellerProfileForm from './components/user/SellerProfileForm';
import ProductCreate from './components/product/ProductCreate';
import ProductList from './components/product/ProductList';
import ProductEdit from './components/product/ProductEdit';
import ChatUsersList from './components/messenger/ChatUsersList';
import ChatUI from './components/messenger/ChatUI';
import { SellerMenuHeader } from './components/menu/SellerMenuHeader';
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
        return <SellerProfileForm />;
      case 'ProductCreate':
        return <ProductCreate />;
      case 'ProductDetails':
        return <ProductList />;
      case 'Chat':
        return <ChatUsersList />;
      case 'Logout':
        this.props.logOut();
        return <SellerProfileForm />;
      default:
        switch (this.props.item) {
          case 'sellerProfile':
            return <SellerProfileForm />;
          case 'productCreate':
            return <ProductCreate />;
          case 'productList':
            return <ProductList />;
          case 'productEdit':
            return <ProductEdit product={this.props.product} />;
          case 'chat':
            return <ChatUI id={this.props.id} />;
          default:
            return <SellerProfileForm />;
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
      <SellerMenuHeader headerText='Toggle' onPress={() => this.toggle()} />
      <View style={styles.MenuContainer}>
        {this.renderContent()}
      </View>
      </SideMenu>
    );
  }
}

export default connect(null, { logOut })(SellerMenuProfile);
