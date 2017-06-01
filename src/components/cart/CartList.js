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
    console.log('this.props.cartItems ', this.props.cartItems);
    let subTotal = parseFloat(0.0);
    _.map(this.props.cartItems, (val, uid) => {
      console.log('val and uid is ', val, uid);
      subTotal = parseFloat(subTotal) + parseFloat(val.rentExpected);
    });
    const valShipping = parseFloat(0.0);
    const estTax = parseFloat(0.0);
    const estTotal = subTotal + valShipping + estTax;
    return (
      <Card>
      {this.renderListView()}
      <CardSection>
        <Text>You just added {(this.props.cartItems).length} item</Text>
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
        <Button>
          Check Out
        </Button>
      </CardSection>
    </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('cartReducer ', state.cartReducer);
  return { cartItems: state.cartReducer.cartItems };
};

export default connect(mapStateToProps)(CartList);
