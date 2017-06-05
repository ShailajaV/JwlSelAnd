/* Product details added to the cart */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { productDetailsChanged, addToCart } from '../../actions';
import { Card, CardSection, Button } from '../common';
import styles from '../common/CommonCSS';
import { EDIT, REMOVE } from '../../actions/constants';

class CartForm extends Component {

  componentWillMount() {
    _.each(this.props.cartItem, (value, prop) => {
      this.props.productDetailsChanged({ prop, value });
    });
  }

  editItem() {
    Actions.selectedProduct({ product: this.props.cartItem });
  }

  async removeItem() {
    const cartArray = [];
    try {
      const { productId } = this.props.cartItem;
      const getProducts = JSON.parse(await AsyncStorage.getItem('addToCart'));
      if (getProducts !== null) {
        _.map(getProducts, (val) => {
          // removing the product
          if (val.productId !== productId) cartArray.push(val);
        });
      }
      await AsyncStorage.setItem('addToCart', JSON.stringify(cartArray));
    } catch (error) {
      console.log('AsyncStorage error: ', error.message);
    }
    this.props.addToCart();
  }

  render() {
    const { url, productName, rentExpected, sellerCompanyName, quantity } = this.props.cartItem;
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
              <Image style={styles.upload} source={{ uri: url }} />
            </View>
            <CardSection style={{ flexDirection: 'column' }}>
              <Text>Seller: {sellerCompanyName}</Text>
              <Text>ProductName: {productName}</Text>
              <Text>RentExpected: {rentExpected}</Text>
              <Text>Quantity: {quantity}</Text>
            </CardSection>
          </CardSection>
          <CardSection>
            <Button onPress={this.editItem.bind(this)}>
              {EDIT}
            </Button>
            <Button onPress={this.removeItem.bind(this)}>
              {REMOVE}
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

export default connect(null,
  { productDetailsChanged, addToCart })(CartForm);
