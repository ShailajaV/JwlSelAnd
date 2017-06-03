/* List of items in cart */
import _ from 'lodash';
import React, { Component } from 'react';
import { Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import CartForm from './CartForm';
import { Card, CardSection, Button } from '../common';

class CartList extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
  // nextProps are the next set of props that this component
  // will be rendered with
  // this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  onCheckOut() {

  }

  createDataSource({ cartItems }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(cartItems);
  }

  renderRow(cartItem) {
    return <CartForm cartItem={cartItem} />;
  }

  renderListView() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }

  render() {
    let subTotal = parseFloat(0.0);
    let valShipping = parseFloat(0.0);
    let estTax = parseFloat(0.0);
    let quantity = parseInt(0, 10);
    _.map(this.props.cartItems, (val) => {
      subTotal = parseFloat(subTotal) + parseFloat(val.rentExpected);
      valShipping = parseFloat(valShipping) + parseFloat(val.shippingCost);
      estTax = parseFloat(estTax) + parseFloat(val.estTax);
      quantity = parseInt(quantity, 10) + parseInt(val.quantity, 10);
    });
    const estTotal = subTotal + valShipping + estTax;
    return (
      <Card>
      {this.renderListView()}
      <CardSection>
        <Text>You just added {quantity} item/s</Text>
      </CardSection>
      <CardSection>
        <Text>Subtotal(1 item)</Text>
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
      <CardSection>
        <Button onPress={this.onCheckOut.bind(this)}>
          Check Out
        </Button>
      </CardSection>
    </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { cartItems: state.cartForm.cartItems };
};

export default connect(mapStateToProps)(CartList);
