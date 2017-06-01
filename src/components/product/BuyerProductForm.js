/* Product details of the buyer selected product */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { addToCart, productDetailsChanged } from '../../actions';
import { Card, CardSection, Button, Input } from '../common';
import { LABEL_QUANTITY, QUANTITY, UNDEFINED } from '../../actions/constants';
import styles from '../common/CommonCSS';
import { validateEmptyFields } from '../common/Utils';

class BuyerProductForm extends Component {
  constructor(props) {
    super(props);
    this.validations = this.validations.bind(this);
  }
  state = {
    errors: {}
  }
  async addToCart() {
    const errors = this.validations(this.props);
    if (Object.keys(errors).length === 0) {
      const cartArray = [];
      //await AsyncStorage.removeItem('addToCart');
      try {
        const { sellerCompanyName } = this.props.selectedSeller;
        const { id, productName, url, rentExpected } = this.props.product;
        const { quantity } = this.props;
        let incExistPrd = false;
        const product = {
          productId: id,
          sellerCompanyName,
          quantity,
          productName,
          url,
          rentExpected
        };
        const getProducts = JSON.parse(await AsyncStorage.getItem('addToCart'));
        if (getProducts !== null) {
          // already added products
          _.map(getProducts, (val) => {
            // adding same product again
            if (val.productId === id) {
              incExistPrd = true;
              product.quantity =
              parseInt(product.quantity, 10) +
              parseInt(val.quantity, 10);
              product.rentExpected =
              parseInt(product.quantity, 10) *
              parseFloat(product.rentExpected);
            } else cartArray.push(val);
          });
          // new product with quanity > 1(cart has products)
          if (product.quantity > 1 && !incExistPrd) {
            product.rentExpected =
            parseInt(product.quantity, 10) *
            parseFloat(product.rentExpected);
          }
        } else if (product.quantity > 1) {
          // new product with quanity > 1(cart is null)
            product.rentExpected =
            parseInt(product.quantity, 10) *
            parseFloat(product.rentExpected);
            product.rentExpected = Math.round(product.rentExpected * 100) / 100;
        }
        cartArray.push(product);
        await AsyncStorage.setItem('addToCart', JSON.stringify(cartArray));
      } catch (error) {
        console.log('AsyncStorage error: ', error.message);
      }
      this.props.addToCart();
    }
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

  validations(values) {
    const { quantity } = values;
    let errors = {};
    if (typeof quantity !== UNDEFINED) {
      errors = validateEmptyFields(QUANTITY, quantity, this.state.errors);
    } else if (values.uniqueName === QUANTITY) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }
    this.setState({ errors });
    return errors;
  }

  render() {
    const { productName, url, rentExpected } = this.props.product;
    const { sellerCompanyName } = this.props.selectedSeller;
    return (
      <Card>
        <CardSection style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{sellerCompanyName}</Text>
        </CardSection>
        <CardSection>
          <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
            <Image style={styles.upload} source={{ uri: url }} />
          </View>
        <CardSection />
        <CardSection />
          <Text>
            {'    '}Rent this {'\n'}beautiful {productName} {'\n'}{'   '}for {rentExpected} per day
          </Text>
        </CardSection>
        <CardSection>
          <Input
            editable
            label={LABEL_QUANTITY}
            value={String(this.props.quantity)}
            errorMessage={this.state.errors.quantity}
            uniqueName={QUANTITY}
            validate={this.validations.bind(this)}
            onChange={this.handleChange.bind(this)}
            onChangeText={value =>
              this.props.productDetailsChanged({ prop: 'quantity', value })}
          />
        </CardSection>
        <View
          style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Text style={styles.errorTextStyle}>
            {this.state.errors.quantity}
          </Text>
        </View>

        <CardSection>
          <Button onPress={this.addToCart.bind(this)}>
            ADDTOCART
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { quantity } = state.productForm;
  return { selectedSeller: state.buyerProductForm.selectedSeller, quantity };
};

export default connect(mapStateToProps, { addToCart, productDetailsChanged })(BuyerProductForm);
