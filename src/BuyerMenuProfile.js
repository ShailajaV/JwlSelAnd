import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import BuyerMenu from './components/menu/BuyerMenu';
import styles from './components/common/CommonCSS';
import BuyerProductList from './components/product/BuyerProductList';
import { MenuHeader } from './components/common/MenuHeader';
import { logOut } from './actions';

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
        return <BuyerProductList />;
      case 'Logout':
        this.props.logOut();
        return <BuyerProductList />;
      default:
        switch (this.props.item) {
          case 'buyerProducts':
            return <BuyerProductList />;
          default:
            return <BuyerProductList />;
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
      <MenuHeader headerText='Toggle' onPress={() => this.toggle()} />
      <View style={styles.MenuContainer}>
        {this.renderContent()}
      </View>
      </SideMenu>
    );
  }
}

export default connect(null, { logOut })(BuyerMenuProfile);
