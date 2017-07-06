/* List of items in cart */
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import CartForm from './CartForm';
import { Card, CardSection, Button } from '../common';
import { checkout } from '../../actions';
import ItemsEstimatedCost from '../checkout/ItemsEstimatedCost';

class CartList extends Component {
  componentWillMount() {
    console.log('this.props ', this.props);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
  // nextProps are the next set of props that this component
  // will be rendered with
  // this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  onCheckout() {
    this.props.checkout();
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
    let cartLength = 0;
    if (this.props.cartItems === null || this.props.cartItems.length === 0) cartLength = 0;
    else cartLength = 1;
    let checkoutView = (<CardSection>
      <Button onPress={this.onCheckout.bind(this)}>
        Check Out
      </Button>
    </CardSection>);
    if (cartLength === 0) checkoutView = <CardSection />;
    return (
      <Card>
      {this.renderListView()}
      <ItemsEstimatedCost onRef={ref => (this.child = ref)} />
      {checkoutView}
    </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { cartItems: state.cartForm.cartItems };
};

export default connect(mapStateToProps, { checkout })(CartList);
