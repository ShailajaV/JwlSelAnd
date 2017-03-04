/* Product information */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, PixelRatio, Platform,
  ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { CardSection, Input } from '../common';
import { LABEL_PRODUCT_NAME, LABEL_DAYS_OF_RENT, LABEL_RENT_EXPECTED,
  UPLOAD_COLLECTIONS, PRODUCT_NAME, DAYS_OF_RENT, RENT_EXPECTED,
  UNDEFINED } from '../../actions/constants';
import { productDetailsChanged } from '../../actions';
import { validateEmptyFields, validateURLField, validateDaysOfRent,
  validateRentExpected } from '../common/Utils';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.validations = this.validations.bind(this);
  }
  state = {
    errors: {}
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }

  handleChange(fieldName, fieldValue) {
    if (typeof this.state.errors[fieldName] !== UNDEFINED) {
      const errors = Object.assign({}, this.state.errors);
      delete errors[fieldName];
      this.setState({
        [fieldName]: fieldValue,
        errors });
    } else {
      this.setState({ [fieldName]: fieldValue });
    }
  }

  validations(values) {
    const { productName, daysOfRent, rentExpected, url, uploadURL } = values;
    let errors = {};
    if (typeof productName !== UNDEFINED) {
      errors = validateEmptyFields(PRODUCT_NAME, productName, this.state.errors);
    } else if (values.uniqueName === PRODUCT_NAME) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof uploadURL !== UNDEFINED && typeof url !== UNDEFINED) {
      errors = validateURLField(uploadURL, url, this.state.errors);
    }

    if (typeof daysOfRent !== UNDEFINED) {
      errors = validateDaysOfRent(daysOfRent, this.state.errors);
    } else if (values.uniqueName === DAYS_OF_RENT) {
      errors = validateDaysOfRent(values.value, this.state.errors);
    }

    if (typeof rentExpected !== UNDEFINED) {
      errors = validateRentExpected(rentExpected, this.state.errors);
    } else if (values.uniqueName === RENT_EXPECTED) {
      errors = validateRentExpected(values.value, this.state.errors);
    }
    this.setState({ errors });
    return errors;
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
        this.props.productDetailsChanged({ prop: 'uploadURL', value: source });
        this.handleChange('url', source);
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
        <ScrollView>
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.url}
            </Text>
          </View>

          <CardSection>
            <Input
              editable
              label={LABEL_PRODUCT_NAME}
              value={this.props.productName}
              errorMessage={this.state.errors.productName}
              uniqueName={PRODUCT_NAME}
              validate={this.validations.bind(this)}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.productDetailsChanged({ prop: 'productName', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.productName}
            </Text>
          </View>

          <CardSection>
            <Input
              editable
              label={LABEL_DAYS_OF_RENT}
              value={this.props.daysOfRent}
              errorMessage={this.state.errors.daysOfRent}
              uniqueName={DAYS_OF_RENT}
              validate={this.validations.bind(this)}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.productDetailsChanged({ prop: 'daysOfRent', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.daysOfRent}
            </Text>
          </View>

          <CardSection>
            <Input
              editable
              label={LABEL_RENT_EXPECTED}
              value={this.props.rentExpected}
              errorMessage={this.state.errors.rentExpected}
              uniqueName={RENT_EXPECTED}
              validate={this.validations.bind(this)}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.productDetailsChanged({ prop: 'rentExpected', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.rentExpected}
            </Text>
          </View>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </ScrollView>
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
