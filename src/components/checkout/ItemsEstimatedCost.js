/*Estimation cost*/
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../common';

class ItemsEstimatedCost extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  render() {
    let subTotal = 0;
    let valShipping = 0;
    let estTax = 0;
    let quantity = 0;
    _.map(this.props.cartItems, (val) => {
      subTotal = parseFloat(subTotal) + parseFloat(val.rentExpected);
      valShipping = parseFloat(valShipping) + parseFloat(val.shippingCost);
      valShipping = parseFloat(valShipping).toFixed(2);
      estTax = parseFloat(estTax) + parseFloat(val.estTax);
      estTax = parseFloat(estTax).toFixed(2);
      quantity = parseInt(quantity, 10) + parseInt(val.quantity, 10);
    });
    let item = 'items';
    if (quantity === 1) item = 'item';
    let itemsAddText = <Text>You just added {quantity} {item}</Text>;
    if (quantity === 0) itemsAddText = <Text>There are no items in your cart.</Text>;
    const estTotal =
    parseFloat(parseFloat(subTotal) + parseFloat(valShipping) + parseFloat(estTax)).toFixed(2);
    return (
      <View>
        <CardSection>
          {itemsAddText}
        </CardSection>
        <Card
          style={{ borderWidth: 1,
            borderColor: '#87cefa' }}
        >
          <CardSection>
            <Text>Subtotal({quantity}{' '}{item})</Text>
            <Text>{subTotal}</Text>
          </CardSection>
          <CardSection>
            <Text>Value shipping</Text>
            <Text>{valShipping}</Text>
          </CardSection>
          <CardSection>
            <Text>Est.Tax</Text>
            <Text>{estTax}</Text>
          </CardSection>
          <CardSection>
            <Text>Est.Total</Text>
            <Text>{estTotal}</Text>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { cartItems: state.cartForm.cartItems };
};

export default connect(mapStateToProps)(ItemsEstimatedCost);
