/* This file display all sellers */
import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from '../common/CommonCSS';
import { SPACE, UNDEFINED } from '../../actions/constants';
import { getProductsDetails } from '../../actions';

class SellerListItem extends Component {

  onSelectSeller() {
    const { id, companyName } = this.props.seller;
    this.props.getProductsDetails(id, companyName);
  }

  onChat() {
    const { id } = this.props.seller;
    Actions.chat({ id });
  }

  render() {
    const { companyName, profilePic } = this.props.seller;
    let srcImg = SPACE;
    if (typeof profilePic === UNDEFINED || profilePic === SPACE) {
      srcImg = require('../common/images/empty.png');
    } else {
      srcImg = { uri: profilePic };
    }
      return (
        <ScrollView>
          <View
            style={[
              styles.item,
              styles.itemSpacing
            ]}
          >
            <TouchableOpacity onPress={this.onSelectSeller.bind(this)}>
              <View style={{ flex: 1, backgroundColor: '#8F8', borderWidth: 1 }}>
                <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
                  <Image style={styles.upload} source={srcImg} />
                </View>
                <Text>{companyName}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.onChat.bind(this)}>
              <Text style={styles.buttonTextStyle}>
                CHAT
              </Text >
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
  }
}

export default connect(null, { getProductsDetails })(SellerListItem);
