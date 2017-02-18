/* This file contains products list */
import React, { Component } from 'react';
import { View, Text, PixelRatio, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';
import { DAYS, DOLLAR, PER_DAY } from '../../actions/constants';
import { productDelete } from '../../actions';

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
        <Card>
          <CardSection>
            <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
              <Image style={styles.upload} source={{ uri: url }} />
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>{productName}</Text>
              <Text style={styles.labelStyle}>{daysOfRent} {DAYS}</Text>
              <Text style={styles.labelStyle}>{DOLLAR}{rentExpected} {PER_DAY}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={this.onEdit.bind(this)}>
                <Image
                  source={require('../common/images/editimage.png')}
                  style={styles.imageStyle}
                  resizeMode={Image.resizeMode.sretch}
                />
              </TouchableOpacity>
            </View>
            <View>
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
    );
  }
}

const styles = {
  uploadContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  upload: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  },
  containerStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'relative'
  },
  labelStyle: {
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'Cochin',
    lineHeight: 23,
    height: 30
  }
};

export default connect(null, { productDelete })(ProductListItem);
