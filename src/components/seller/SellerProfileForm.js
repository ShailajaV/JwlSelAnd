/* Seller profile form */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity,
   Platform, PixelRatio } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Card, CardSection, Input, MultilineInput, Button, BackgroundImage } from '../common';
import { LABEL_SELLER_NAME, LABEL_COMPANY_NAME,
  LABEL_SELLER_ADDRESS, SAVE, NEXT } from '../../actions/constants';
import { sellerProfileChanged, saveSellerProfile, getSellerProfileImage } from '../../actions';

class SellerProfileForm extends Component {
  state = { editable: false,
            uploadURL: null,
            deleteFlag: 0 };
  componentWillMount() {
    _.each(this.props.seller, (value, prop) => {
      this.props.sellerProfileChanged({ prop, value });
    });
    this.props.getSellerProfileImage();
  }

  onImageDelete() {
    this.setState({
      uploadURL: null,
      deleteFlag: 1
    });
  }

  onSaveButtonPress() {
    const { fullName, companyName, address } = this.props;
    this.props.saveSellerProfile({ uploadURL: this.state.uploadURL,
      deleteFlag: this.state.deleteFlag,
      fullName,
      companyName,
      address,
      uid: this.props.seller.uid
    });
  }

  onNextButtonPress() {
    Actions.product();
  }

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
          uploadURL: source,
          deleteFlag: 0
        });
      }
    });
  }

  render() {
    let srcImg = '';
    if (this.state.uploadURL !== null) {
      srcImg = this.state.uploadURL;
    } else if (this.props.image === 'undefined' || this.props.image === '' ||
                this.props.image === null || this.state.deleteFlag === 1) {
      srcImg = require('../common/images/noimage.png');
    } else {
      srcImg = { uri: this.props.image };
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
            <View sytle={styles.containerStyle}>
              <TouchableOpacity onPress={this.onImageDelete.bind(this)}>
                <Image
                  source={require('../common/images/deleteimage.jpeg')}
                  style={styles.imageStyle}
                  resizeMode={Image.resizeMode.sretch}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <Image
                  source={require('../common/images/editimage.png')}
                  style={styles.imageStyle}
                  resizeMode={Image.resizeMode.sretch}
                />
              </TouchableOpacity>
            </View>
          </CardSection>
          <CardSection style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => this.setState({ editable: !this.state.editable })}>
              <Image
                source={require('../common/images/editimage.png')}
                style={styles.imageStyle}
                resizeMode={Image.resizeMode.sretch}
              />
            </TouchableOpacity>
          </CardSection>

          <CardSection>
            <Input
              editable={this.state.editable}
              label={LABEL_SELLER_NAME}
              value={this.props.fullName}
              onChangeText={value =>
                this.props.sellerProfileChanged({ prop: 'fullName', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              editable={this.state.editable}
              label={LABEL_COMPANY_NAME}
              value={this.props.companyName}
              onChangeText={value =>
                this.props.sellerProfileChanged({ prop: 'companyName', value })}
            />
          </CardSection>

          <CardSection>
            <MultilineInput
              editable={this.state.editable}
              label={LABEL_SELLER_ADDRESS}
              value={this.props.address}
              onChangeText={value =>
                this.props.sellerProfileChanged({ prop: 'address', value })}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            <Button onPress={this.onSaveButtonPress.bind(this)}>
              {SAVE}
            </Button>
            <Button onPress={this.onNextButtonPress.bind(this)}>
              {NEXT}
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

const mapStateToProps = (state) => {
  const { fullName, companyName, address, image, error } = state.sellerForm;
  return { fullName, companyName, address, image, error };
};


export default connect(mapStateToProps, {
  sellerProfileChanged,
  getSellerProfileImage,
  saveSellerProfile })(SellerProfileForm);
