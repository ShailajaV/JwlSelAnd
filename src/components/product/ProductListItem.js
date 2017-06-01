/* This file contains products list */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ResponsiveImage from 'react-native-responsive-image';
import { CardSection } from '../common';
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
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View
          style={[
            styles.item,
            styles.itemSpacing
          ]}
        >
          <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
            <ResponsiveImage source={{ uri: url }} initWidth='180' initHeight='100'>
            <TouchableOpacity onPress={this.onEdit.bind(this)}>
            <Icon
              name='pencil'
              size={20}
              backgroundColor='#00fff'
              style={styles.imageStyle}
            />
            </TouchableOpacity>
          <TouchableOpacity onPress={this.onDelete.bind(this)}>
          <Icon
            name='trash-o'
            size={20}
            backgroundColor='#00fff'
            style={styles.imageStyle}
          />
          </TouchableOpacity>
          </ResponsiveImage>
          </View>
          <View style={styles.prdContainerStyle}>
            <Text style={styles.prdLabelStyle}>{productName}</Text>
            <Text style={styles.prdLabelStyle}>{daysOfRent} {DAYS}</Text>
            <Text style={styles.prdLabelStyle}>{DOLLAR}{rentExpected} {PER_DAY}</Text>
          </View>
          <View>
            <CardSection />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(null, { productDelete })(ProductListItem);
