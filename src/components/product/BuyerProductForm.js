/* Product details of the buyer selected product */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Button } from '../common';
import styles from '../common/CommonCSS';

class BuyerProductForm extends Component {
  render() {
    const { productName, url, rentExpected } = this.props.product;
    return (
      <Card>
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
          <Button>
            ADDTOCART
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default BuyerProductForm;
