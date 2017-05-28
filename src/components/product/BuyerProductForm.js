/* Product details of the buyer selected product */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { addToCart } from '../../actions';
import { Card, CardSection, Button } from '../common';
import styles from '../common/CommonCSS';

class BuyerProductForm extends Component {
  addToCart() {
    //console.log('this.props.product ', this.props.product);
    //const { id } = this.props.product;
    this.props.addToCart({ product: this.props.product });
    //Actions.cart({ product: this.props.product });
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
          <Button onPress={this.addToCart.bind(this)}>
            ADDTOCART
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return { selectedSeller: state.buyerProductForm.selectedSeller };
};

export default connect(mapStateToProps, { addToCart })(BuyerProductForm);
