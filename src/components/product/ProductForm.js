/* Product information */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, PixelRatio, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { CardSection, Input } from '../common';
import { LABEL_PRODUCT_NAME, LABEL_DAYS_OF_RENT, LABEL_RENT_EXPECTED,
  UPLOAD_COLLECTIONS } from '../../actions/constants';
import { productDetailsChanged } from '../../actions';

class ProductForm extends Component {

  selectPhotoTapped() {
    ImagePicker.showImagePicker({}, (response) => {
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
        let source;
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }
        this.props.productDetailsChanged({ prop: 'uploadURL', value: source });
      }
    });
  }

  render() {
    let srcImg = '';
    if (this.props === null || this.props === '' || this.props === 'undefined') {
        srcImg = require('../common/images/noimage.png');
    } else {
      const { url, uploadURL } = this.props;
      if (uploadURL !== '') {
        srcImg = uploadURL;
      } else if (url !== '') {
        srcImg = { uri: url };
      } else {
        srcImg = require('../common/images/noimage.png');
      }
    }

    return (
      <View>
        <CardSection>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Text style={styles.labelStyle}>{UPLOAD_COLLECTIONS}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
              <Image style={styles.upload} source={srcImg} />
            </View>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <Input
            editable
            label={LABEL_PRODUCT_NAME}
            value={this.props.productName}
            onChangeText={value =>
              this.props.productDetailsChanged({ prop: 'productName', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            editable
            label={LABEL_DAYS_OF_RENT}
            value={this.props.daysOfRent}
            onChangeText={value =>
              this.props.productDetailsChanged({ prop: 'daysOfRent', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            editable
            label={LABEL_RENT_EXPECTED}
            value={this.props.rentExpected}
            onChangeText={value =>
              this.props.productDetailsChanged({ prop: 'rentExpected', value })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
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
  labelStyle: {
    color: '#000',
    fontSize: 18,
    paddingLeft: 20,
    fontFamily: 'Cochin',
    lineHeight: 23,
    height: 30,
    backgroundColor: '#fff'
  }
};

const mapStateToProps = (state) => {
  const { productName, daysOfRent, rentExpected, url, uploadURL, error } = state.productForm;
  return { productName, daysOfRent, rentExpected, url, uploadURL, error };
};

export default connect(mapStateToProps, { productDetailsChanged })(ProductForm);
