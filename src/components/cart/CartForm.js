/* Product details added to the cart */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
//import { Actions } from 'react-native-router-flux';
import { productDetailsChanged, addToCart } from '../../actions';
import { Card, CardSection, Button, Input } from '../common';
import styles from '../common/CommonCSS';
import { LABEL_QUANTITY, QUANTITY, UNDEFINED } from '../../actions/constants';
import { validateQuantity } from '../common/Utils';

class CartForm extends Component {
  constructor(props) {
    super(props);
    this.validations = this.validations.bind(this);
  }

  state = {
    errors: {}
  }

  componentWillMount() {
    _.each(this.props.cartItem, (value, prop) => {
      this.props.productDetailsChanged({ prop, value });
    });
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

  handleChange(fieldName, fieldValue) {
    if (typeof this.state.errors[fieldName] !== UNDEFINED) {
      const errors = Object.assign({}, this.state.errors);
      delete errors[fieldName];
      this.setState({
        [fieldName]: fieldValue,
        errors });
    } else {
      this.setState({ [fieldName]: fieldValue });
    }
  }

  async validations(values) {
    const { quantity } = values;
    let errors = {};
    if (typeof quantity !== UNDEFINED) {
      errors = validateQuantity(quantity, this.state.errors);
    } else if (values.uniqueName === QUANTITY) {
      errors = validateQuantity(values.value, this.state.errors);
    }
    this.setState({ errors });

    /*if (errors === null) {
      const cartArray = [];
      try {
        const { id }
         = this.props.cartItem;
        const getProducts = JSON.parse(await AsyncStorage.getItem('addToCart'));
        if (getProducts !== null) {
          // already added products
          _.map(getProducts, (val) => {
            // adding same product again
            if (val.productId === id) {
              const product = {
                productId: id,
                sellerCompanyName: val.sellerCompanyName,
                quantity,
                productName: val.productName,
                url: val.url,
                rentExpected: val.rentExpected,
                shippingCost: val.shippingCost,
                estTax: val.estTax
              };
              const rentExp = val.rentExpected % val.quantity;
              console.log('rentExp ', rentExp);
              product.rentExpected =
              parseInt(quantity, 10) *
              parseFloat(rentExp);
              cartArray.push(product);
            } else cartArray.push(val);
          });
        }
        await AsyncStorage.setItem('addToCart', JSON.stringify(cartArray));
      } catch (error) {
        console.log('AsyncStorage error: ', error.message);
      }
      this.props.addToCart();
    } else*/ return errors;
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
              <CardSection>
                <Input
                  editable
                  label={LABEL_QUANTITY}
                  value={String(quantity)}
                  errorMessage={this.state.errors.quantity}
                  uniqueName={QUANTITY}
                  validate={this.validations.bind(this)}
                  onChange={this.handleChange.bind(this)}
                  onChangeText={value =>
                    this.props.productDetailsChanged({ prop: 'quantity', value })}
                />
              </CardSection>
              <Button onPress={this.removeItem.bind(this)}>
                Remove
              </Button>
              </CardSection>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

export default connect(null,
  { productDetailsChanged, addToCart })(CartForm);
