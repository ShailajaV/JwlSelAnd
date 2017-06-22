/* Product information */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Platform,
  ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { CardSection, Input } from '../common';
import { LABEL_PRODUCT_NAME, LABEL_DAYS_OF_RENT, LABEL_RENT_EXPECTED,
  UPLOAD_PRODUCT, PRODUCT_NAME, DAYS_OF_RENT, RENT_EXPECTED,
  UNDEFINED, SPACE, FILE, ANDROID, LABEL_SHIPPING_COST, LABEL_EST_TAX,
  SHIPPING_COST, EST_TAX, LABEL_QUANTITY, QUANTITY } from '../../actions/constants';
import { productDetailsChanged } from '../../actions';
import { validateEmptyFields, validateURLField, validateDaysOfRent,
  validateRentExpected, validateShippingCost, validateEstTax,
  validateQuantity } from '../common/Utils';
import styles from '../common/CommonCSS';

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
    const { productName, daysOfRent, rentExpected, url, uploadURL,
      shippingCost, estTax, quantity } = values;
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

    if (typeof shippingCost !== UNDEFINED) {
      errors = validateShippingCost(shippingCost, this.state.errors);
    } else if (values.uniqueName === SHIPPING_COST) {
      errors = validateShippingCost(values.value, this.state.errors);
    }

    if (typeof estTax !== UNDEFINED) {
      errors = validateEstTax(estTax, this.state.errors);
    } else if (values.uniqueName === EST_TAX) {
      errors = validateEstTax(values.value, this.state.errors);
    }

    if (typeof quantity !== UNDEFINED) {
      errors = validateQuantity(quantity, this.state.errors);
    } else if (values.uniqueName === QUANTITY) {
      errors = validateQuantity(values.value, this.state.errors);
    }
    this.setState({ errors });
    return errors;
  }

  selectPhotoTapped() {
    ImagePicker.showImagePicker({}, (response) => {
    if (response.didCancel || response.error || response.customButton) {
      console.log('User cancelled photo picker');
    } else {
        let source;
        if (Platform.OS === ANDROID) {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace(FILE, SPACE) };
        }
        this.props.productDetailsChanged({ prop: 'uploadURL', value: source });
        this.handleChange('url', source);
      }
    });
  }

  render() {
    let srcImg = SPACE;
    if (this.props === null || this.props === SPACE || this.props === UNDEFINED) {
        srcImg = require('../common/images/empty.png');
    } else {
      const { url, uploadURL } = this.props;
      if (uploadURL !== SPACE) {
        srcImg = uploadURL;
      } else if (url !== SPACE) {
        srcImg = { uri: url };
      } else {
        srcImg = require('../common/images/empty.png');
      }
    }

    return (
        <ScrollView>
          <CardSection>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <Text style={styles.uploadLabelStyle}>{UPLOAD_PRODUCT}</Text>
            </TouchableOpacity>
            <CardSection />
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
              value={String(this.props.daysOfRent)}
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
              value={String(this.props.rentExpected)}
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

          <CardSection>
            <Input
              editable
              label={LABEL_SHIPPING_COST}
              value={String(this.props.shippingCost)}
              errorMessage={this.state.errors.shippingCost}
              uniqueName={SHIPPING_COST}
              validate={this.validations.bind(this)}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.productDetailsChanged({ prop: 'shippingCost', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.shippingCost}
            </Text>
          </View>

          <CardSection>
            <Input
              editable
              label={LABEL_EST_TAX}
              value={String(this.props.estTax)}
              errorMessage={this.state.errors.estTax}
              uniqueName={EST_TAX}
              validate={this.validations.bind(this)}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.productDetailsChanged({ prop: 'estTax', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.estTax}
            </Text>
          </View>

          <CardSection>
            <Input
              editable
              label={LABEL_QUANTITY}
              value={String(this.props.quantity)}
              errorMessage={this.state.errors.quantity}
              uniqueName={QUANTITY}
              validate={this.validations.bind(this)}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.productDetailsChanged({ prop: 'quantity', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.quantity}
            </Text>
          </View>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { productName, daysOfRent, rentExpected, shippingCost,
    estTax, quantity, url, uploadURL, error } = state.productForm;
  return { productName,
    daysOfRent,
    rentExpected,
    shippingCost,
    estTax,
    quantity,
    url,
    uploadURL,
    error
   };
};

export default connect(mapStateToProps,
  { productDetailsChanged })(ProductForm);
