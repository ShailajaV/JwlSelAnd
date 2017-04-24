/* This file contains products list */
import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { DAYS, DOLLAR, PER_DAY } from '../../actions/constants';
import styles from '../common/CommonCSS';

class BuyerProductListItem extends Component {

  render() {
    const { productName, daysOfRent, rentExpected, url } = this.props.product;
    return (
      <ScrollView style={{ backgroundColor: '#1abc9c' }}>
        <View
          style={[
            styles.item,
            styles.itemSpacing
          ]}
        >
          <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
            <Image style={styles.upload} source={{ uri: url }} />
          </View>
          <View style={styles.prdContainerStyle}>
            <Text style={styles.prdLabelStyle}>{productName}</Text>
            <Text style={styles.prdLabelStyle}>{daysOfRent} {DAYS}</Text>
            <Text style={styles.prdLabelStyle}>{DOLLAR}{rentExpected} {PER_DAY}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(null)(BuyerProductListItem);
