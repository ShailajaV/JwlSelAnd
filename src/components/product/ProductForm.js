/* Product information */
import React, { Component } from 'react';
import { View, TouchableOpacity, Image, PixelRatio, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Card, CardSection, BackgroundImage, Input, Button } from '../common';
import { LABEL_PRODUCT_NAME, LABEL_RENT_DAYS, LABEL_RENT_EXPECTED,
  ADD_MORE, SUBMIT } from '../../actions/constants';
import { productDetailsChanged } from '../../actions';

class ProductForm extends Component {

  state = {
    uploadURL: null
  };

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

        this.setState({
          uploadURL: source
        });
      }
    });
  }

  render() {
    let srcImg = '';
    if (this.state.uploadURL !== null) {
      srcImg = this.state.uploadURL;
    } else {
      srcImg = require('../common/images/noimage.png');
    }

    return (
      <BackgroundImage>
        <Card>
          <CardSection>
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
              label={LABEL_RENT_DAYS}
              value={this.props.rentDays}
              onChangeText={value =>
                this.props.productDetailsChanged({ prop: 'rentDays', value })}
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
          <CardSection>
            <Button>
              {ADD_MORE}
            </Button>
            <Button>
              {SUBMIT}
            </Button>
          </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

const styles = {
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
    alignItems: 'flex-start',
    position: 'relative',
    opacity: 0.7
  },
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
  }
};

export default connect(null, { productDetailsChanged })(ProductForm);
