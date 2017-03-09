/* This file contains products list */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';
import { DAYS, DOLLAR, PER_DAY } from '../../actions/constants';
import { productDelete } from '../../actions';
import styles from '../common/CommonCSS';

class ProductListItem extends Component {

  onEdit() {
    Actions.productEdit({ product: this.props.product });
  }
  onDelete() {
    const { productName } = this.props.product;
    this.props.productDelete({ uid: this.props.product.uid, productName });
  }

  render() {
    const { productName, daysOfRent, rentExpected, url } = this.props.product;
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
              <Image style={styles.upload} source={{ uri: url }} />
            </View>
            <View style={styles.prdContainerStyle}>
              <Text style={styles.prdLabelStyle}>{productName}</Text>
              <Text style={styles.prdLabelStyle}>{daysOfRent} {DAYS}</Text>
              <Text style={styles.prdLabelStyle}>{DOLLAR}{rentExpected} {PER_DAY}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={this.onEdit.bind(this)}>
                <Image
                  source={require('../common/images/editImage.png')}
                  style={styles.imageStyle}
                  resizeMode={Image.resizeMode.sretch}
                />
              </TouchableOpacity>
              <CardSection />
              <TouchableOpacity onPress={this.onDelete.bind(this)}>
              <Image
                source={require('../common/images/deleteimage.jpeg')}
                style={styles.imageStyle}
                resizeMode={Image.resizeMode.sretch}
              />
            </TouchableOpacity>
            </View>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

export default connect(null, { productDelete })(ProductListItem);
