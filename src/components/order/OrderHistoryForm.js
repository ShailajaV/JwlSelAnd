/* Order history */
import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import moment from 'moment';
import { Card, CardSection } from '../common';
import styles from '../common/CommonCSS';
import ItemsEstimatedCost from '../checkout/ItemsEstimatedCost';

class OrderHistoryForm extends Component {
  render() {
    let subTotal = 0;
    let valShipping = 0;
    let estTax = 0;
    const { createdAt, prefAddr, cartItems } = this.props.order.orderDetails;
    const splitAdd = prefAddr.address.split(',');
    const streetName = splitAdd[0];
    const aptNum = splitAdd[1];
    const stZip = `${splitAdd[2]},${splitAdd[3]},${splitAdd[4]}`;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Card />
        <Card>
          <CardSection>
            <Text>Order Id:</Text>
            <Text>{this.props.order.id}</Text>
          </CardSection>
          <CardSection>
            <Text>Ordered Date:</Text>
            <Text>{moment(new Date(createdAt)).format('DD-MM-YYYY HH:mm')}</Text>
          </CardSection>
          <CardSection>
            <Text>Shipping Address:</Text>
            <Text>{'   '}{prefAddr.fullName}{'\n'}{'   '}{streetName}{'\n'}{'   '}
            {aptNum}{'\n'}{'   '}
            {stZip}</Text>
          </CardSection>
          {cartItems.map((cartItem, ind) => {
            subTotal = parseFloat(subTotal) + parseFloat(cartItem.rentExpected);
            valShipping = parseFloat(valShipping) + parseFloat(cartItem.shippingCost);
            valShipping = parseFloat(valShipping).toFixed(2);
            estTax = parseFloat(estTax) + parseFloat(cartItem.estTax);
            estTax = parseFloat(estTax).toFixed(2);
            return (
              <View key={ind}>
                <CardSection style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text>Items Ordered:</Text>
                </CardSection>
                <CardSection style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
                    <Image style={styles.upload} source={{ uri: cartItem.url }} />
                  </View>
                  <Text>{cartItem.productName}</Text>
                </CardSection>
                <CardSection style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text>Quantity:</Text>
                  <Text>{cartItem.quantity}</Text>
                </CardSection>
                <CardSection style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text>Rent Expected:</Text>
                  <Text>{cartItem.rentExpected}</Text>
                </CardSection>
              </View>);
            })
          }
        </Card>
        <ItemsEstimatedCost onRef={ref => (this.child = ref)} cartItemsOrdHist={cartItems} />
      </ScrollView>
    );
  }
}

export default OrderHistoryForm;
