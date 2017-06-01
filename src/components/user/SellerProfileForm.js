/* Seller profile form */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity,
   Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ResponsiveImage from 'react-native-responsive-image';
import { Card, CardSection, Input, MultilineInput, Button } from '../common';
import { LABEL_SELLER_NAME, LABEL_COMPANY_NAME,
  LABEL_SELLER_ADDRESS, SAVE, NEXT, FULLNAME, COMPANYNAME, ADDRESS,
  UNDEFINED, SPACE, FILE, ANDROID } from '../../actions/constants';
import { sellerProfileChanged, saveSellerProfile, getSellerProfileImage } from '../../actions';
import { validateEmptyFields } from '../common/Utils';
import styles from '../common/CommonCSS';

class SellerProfileForm extends Component {
  constructor(props) {
    super(props);
    this.validations = this.validations.bind(this);
  }

  state = { editable: false,
            uploadURL: null,
            deleteFlag: 0,
            errors: {} };
  componentWillMount() {
    _.each(this.props.user, (value, prop) => {
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
    const errors = this.validations(this.props);
    if (Object.keys(errors).length === 0) {
      const { fullName, companyName, address } = this.props;
      const imageURL = this.state.uploadURL;
      this.setState({
        uploadURL: null
      });
      this.props.saveSellerProfile({ imageURL,
        deleteFlag: this.state.deleteFlag,
        fullName,
        companyName,
        address
      });
    }
  }

  onNextButtonPress() {
    this.setState({ errors: {} });
    Actions.productDetails();
  }

  makeEditable() {
    if (!this.state.editable) this.setState({ editable: !this.state.editable });
  }

  validations(values) {
    const { fullName, companyName, address } = values;

    let errors = {};
    if (typeof fullName !== UNDEFINED) {
      errors = validateEmptyFields(FULLNAME, fullName, this.state.errors);
    } else if (values.uniqueName === FULLNAME) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof companyName !== UNDEFINED) {
      errors = validateEmptyFields(COMPANYNAME, companyName, this.state.errors);
    } else if (values.uniqueName === COMPANYNAME) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof address !== UNDEFINED) {
      errors = validateEmptyFields(ADDRESS, address, this.state.errors);
    } else if (values.uniqueName === ADDRESS) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }
    this.setState({ errors });
    return errors;
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

  selectPhotoTapped() {
    ImagePicker.showImagePicker({}, (response) => {
    if (response.didCancel || response.error || response.customButton) {
      console.log('Error while picking image');
    } else {
        let source;
        if (Platform.OS === ANDROID) {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace(FILE, SPACE) };
        }
        this.setState({
            uploadURL: source,
            deleteFlag: 0
        });
      }
    });
  }

  render() {
    let srcImg = SPACE;
    if (this.state.uploadURL !== null) {
      srcImg = this.state.uploadURL;
    } else if (typeof this.props.image === UNDEFINED || this.props.image === SPACE ||
                this.props.image === null || this.state.deleteFlag === 1) {
      srcImg = require('../common/images/empty.png');
    } else {
      srcImg = { uri: this.props.image };
    }

    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Card>
          <CardSection>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
              <ResponsiveImage source={srcImg} initWidth='180' initHeight='100' />
              </View>
            </TouchableOpacity>
            <CardSection />
            <View sytle={styles.selContainerStyle}>
              <TouchableOpacity onPress={this.onImageDelete.bind(this)}>
              <Icon
                name='trash-o'
                size={20}
                backgroundColor='#00fff'
                style={styles.imageStyle}
              />
              </TouchableOpacity>
              <CardSection />
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <Icon
                name='pencil'
                size={20}
                backgroundColor='#00fff'
                style={styles.imageStyle}
              />
              </TouchableOpacity>
            </View>
          </CardSection>
          <CardSection style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={this.makeEditable.bind(this)}>
            <Icon
              name='pencil'
              size={20}
              backgroundColor='#00fff'
              style={styles.imageStyle}
            />
            </TouchableOpacity>
          </CardSection>

          <CardSection>
            <Input
              editable={this.state.editable}
              label={LABEL_SELLER_NAME}
              value={this.props.fullName}
              uniqueName={FULLNAME}
              validate={this.validations}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.sellerProfileChanged({ prop: 'fullName', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.fullName}
            </Text>
          </View>

          <CardSection>
            <Input
              editable={this.state.editable}
              label={LABEL_COMPANY_NAME}
              value={this.props.companyName}
              uniqueName={COMPANYNAME}
              validate={this.validations}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.sellerProfileChanged({ prop: 'companyName', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.companyName}
            </Text>
          </View>

          <CardSection>
            <MultilineInput
              editable={this.state.editable}
              label={LABEL_SELLER_ADDRESS}
              value={this.props.address}
              uniqueName={ADDRESS}
              validate={this.validations}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.sellerProfileChanged({ prop: 'address', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.address}
            </Text>
          </View>

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
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user;
  const { fullName, companyName, address, image, error } = state.sellerForm;
  return { fullName, companyName, address, image, error, user };
};


export default connect(mapStateToProps, {
  sellerProfileChanged,
  getSellerProfileImage,
  saveSellerProfile })(SellerProfileForm);
