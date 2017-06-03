import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import BuyerMenu from './components/menu/BuyerMenu';
import styles from './components/common/CommonCSS';
import { BuyerMenuHeader } from './components/menu/BuyerMenuHeader';
import { logOut, addToCart } from './actions';
import ChatUsersList from './components/messenger/ChatUsersList';
import ChatUI from './components/messenger/ChatUI';
import SellersList from './components/product/SellersList';
import BuyerProductsList from './components/product/BuyerProductsList';
import BuyerProductForm from './components/product/BuyerProductForm';
import CartList from './components/cart/CartList';

class BuyerMenuProfile extends Component {
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

  onCart = () => {
    this.props.addToCart();
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
      case 'AllProducts':
        return <SellersList />;
      case 'Chat':
        return <ChatUsersList />;
      case 'Logout':
        this.props.logOut();
        return <SellersList />;
      default:
        switch (this.props.item) {
          case 'sellersList':
            return <SellersList />;
          case 'buyerProductsList':
            return <BuyerProductsList />;
          case 'chat':
            return <ChatUI id={this.props.id} />;
          case 'selectedProduct':
            return <BuyerProductForm product={this.props.product} />;
          case 'addToCart':
            return <CartList />;
          default:
            return <SellersList />;
        }
    }
  }

  render() {
    const menu = <BuyerMenu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
      >
      <BuyerMenuHeader
        headerText='Toggle'
        onPress={() => this.toggle()}
        onCart={() => this.onCart()}
      />
      <View style={styles.MenuContainer}>
        {this.renderContent()}
      </View>
      </SideMenu>
    );
  }
}

export default connect(null, { logOut, addToCart })(BuyerMenuProfile);
