/* Seller profile form */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity,
   Platform, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, BackgroundImage } from '../common';
import { LABEL_SELLER_NAME, LABEL_COMPANY_NAME,
  LABEL_SELLER_ADDRESS, SAVE, NEXT } from '../../actions/constants';
import { sellerProfileChanged, saveSellerProfile, uploadImage,
  landProductForm } from '../../actions';

class SellerProfileForm extends Component {
  state = { editable: false,
            uploadURL: null };
  componentWillMount() {
    _.each(this.props.seller, (value, prop) => {
      this.props.sellerProfileChanged({ prop, value });
    });
  }

  onImageDelete() {
    this.setState({
      uploadURL: null
    });
  }

  onSaveButtonPress() {
    /*uploadImage(this.state.uploadURL)
      .then(url => this.setState({ uploadURL: url }))
      .catch(error => console.log(error));*/
    const { fullName, companyName, address } = this.props;
    const { uri } = this.state.uploadURL;
    const image = uri;
    console.log('uri ', uri, 'image ', image, '{image} ', { image },
    'fullName ', fullName, '{fullName} ', { fullName }, this.props.seller.uid);
    this.props.saveSellerProfile({ image,
      fullName,
      companyName,
      address,
      uid: this.props.seller.uid });
  }

  onNextButtonPress() {
    this.props.landProductForm();
  }

  selectPhotoTapped() {
        ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);

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
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
              { this.state.uploadURL === null ?
                  <Image style={styles.upload} source={require('../common/images/noimage.png')}>
                    <Text> Upload your picture </Text>
                  </Image>
                :
                <Image style={styles.upload} source={this.state.uploadURL} />
              }
          </View>
          </TouchableOpacity>
          <View sytle={styles.container2}>
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
        </View>
        <Card>
          <CardSection style={styles.containerStyle}>
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
            <Input
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
  pictStyle: {
    width: 70,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-start'
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  },
  containerStyle: {
    padding: 35,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 5
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
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
  const { image, fullName, companyName, address, error } = state.sellerForm;
  return { image, fullName, companyName, address, error };
};


export default connect(mapStateToProps,
  { sellerProfileChanged, uploadImage, saveSellerProfile, landProductForm })(SellerProfileForm);
