/* This file contains products list */
import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { DAYS, DOLLAR, PER_DAY } from '../../actions/constants';
import styles from '../common/CommonCSS';

class BuyerProductListItem extends Component {

  onChat() {
    Actions.chat({ product: this.props.product });
  }

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
          <View>
            <TouchableOpacity onPress={this.onChat.bind(this)}>
              <Text style={styles.buttonTextStyle}>
                CHAT
              </Text >
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(null)(BuyerProductListItem);