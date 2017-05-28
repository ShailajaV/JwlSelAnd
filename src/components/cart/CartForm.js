/* Product details added to the cart */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button } from '../common';
import styles from '../common/CommonCSS';

class CartForm extends Component {
  render() {
    const { url } = this.props.product;
    return (
      <Card>
        <CardSection>
          <Text>You just added one item</Text>
        </CardSection>
        <CardSection>
          <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
            <Image style={styles.upload} source={{ uri: url }} />
          </View>
        </CardSection>
        <CardSection />
        <CardSection />
        <CardSection />
        <CardSection />
        <CardSection>
          <Text>Subtotal(1 item)</Text>
        </CardSection>
        <CardSection>
          <Text>Value shipping</Text>
        </CardSection>
        <CardSection>
          <Text>Est.Tax</Text>
        </CardSection>
        <CardSection>
          <Text>Est.Total</Text>
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

export default CartForm;
