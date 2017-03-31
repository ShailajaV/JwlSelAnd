import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './components/menu/Menu';
import styles from './components/common/CommonCSS';
import SellerProfile from './components/seller/SellerProfile';
import ProductCreate from './components/product/ProductCreate';
import ProductList from './components/product/ProductList';
import MenuButton from './components/common/MenuButton';
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
    console.log('this.state.selectedItem ', this.state.selectedItem);
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
        return <SellerProfile />;
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
      <View style={styles.MenuContainer}>
        {this.renderContent()}
      </View>
      <MenuButton style={styles.MenuButton} onPress={() => this.toggle()}>
       <Image source={{ uri: 'https://raw.githubusercontent.com/react-native-community/react-native-side-menu/master/examples/Basic/assets/menu.png' }} style={{ width: 32, height: 32 }} />
     </MenuButton>
      </SideMenu>
    );
  }
}

export default connect(null, { logOut })(MainScreen);
