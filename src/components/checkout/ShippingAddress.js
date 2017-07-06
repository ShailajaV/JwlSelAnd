/* Add Shipping address */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
//import CheckBox from 'react-native-icon-checkbox';
import { Card, CardSection, Button, InputText } from '../common';
import { paymentDetailsChanged, resetShipAddrValues } from '../../actions';
import styles from '../common/CommonCSS';
import { PLACEHOLDER_FULLNAME, FULLNAME, PLACEHOLDER_STREET,
  ADDRESS_STREET, PLACEHOLDER_APT, ADDRESS_APT, PLACEHOLDER_STATE,
  STATE, PLACEHOLDER_CITY, CITY, PLACEHOLDER_ZIP, ZIP, UNDEFINED } from '../../actions/constants';
import { validateEmptyFields, validateZip } from '../common/Utils';

class ShippingAddress extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      //addrCount: 0
    };
    this.validations = this.validations.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  onShipAddressCancel() {
    this.props.shipAddrsCancel(!this.props.shipAddrVisible);
    // reset all the fields after adding address
    this.props.resetShipAddrValues();
  }

  onShipAddressSave() {
    const errors = this.validations(this.props);
    if (Object.keys(errors).length === 0) {
      let addrs = [];
      addrs = this.props.shipAdrs;//add addresses from db
      const { shipFullName, shipAddrStreet, shipAddrApt, shipState, shipCity, shipZip }
       = this.props;
       //newly added address
      const addr = {
        //radioIndex: this.state.addrCount + 1,
        fullName: shipFullName,
        address: `${shipAddrStreet},${shipAddrApt},${shipCity},${shipState},${shipZip}`,
      };
      addrs.push(addr);
      /*this.props.paymentDetailsChanged(
        { prop: 'shipAddr', value: addr.radioIndex });*/
        //update ship address state variables
        console.log('addrs ', addrs);
      this.props.shipAddrsUpdate(
        !this.props.shipAddrVisible, addrs, false);
      // reset all the fields after adding address
      this.props.resetShipAddrValues();
      /*const { fullName, addrStreet, addrApt, state, city, zip } = this.props;
      this.props.createUserAccount({ fullName,
        addrStreet,
        addrApt,
        state,
        city,
        zip });*/
    }
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
    const { shipFullName, shipAddrStreet, shipAddrApt,
      shipState, shipCity, shipZip } = values;
    let errors = {};
    if (typeof shipFullName !== UNDEFINED) {
      errors = validateEmptyFields(FULLNAME, shipFullName, this.state.errors);
    } else if (values.uniqueName === FULLNAME) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof shipAddrStreet !== UNDEFINED) {
      errors = validateEmptyFields(ADDRESS_STREET, shipAddrStreet, this.state.errors);
    } else if (values.uniqueName === ADDRESS_STREET) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof shipAddrApt !== UNDEFINED) {
      errors = validateEmptyFields(ADDRESS_APT, shipAddrApt, this.state.errors);
    } else if (values.uniqueName === ADDRESS_APT) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof shipState !== UNDEFINED) {
      errors = validateEmptyFields(STATE, shipState, this.state.errors);
    } else if (values.uniqueName === STATE) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof shipCity !== UNDEFINED) {
      errors = validateEmptyFields(CITY, shipCity, this.state.errors);
    } else if (values.uniqueName === CITY) {
      errors = validateEmptyFields(values.uniqueName, values.value, this.state.errors);
    }

    if (typeof shipZip !== UNDEFINED) {
      errors = validateZip(ZIP, shipZip, this.state.errors);
    } else if (values.uniqueName === ZIP) {
      errors = validateZip(values.uniqueName, values.value, this.state.errors);
    }

    this.setState({ errors });
    return errors;
  }
  render() {
    return (
      <Card>
      <CardSection>
        <InputText
          placeholder={PLACEHOLDER_FULLNAME}
          value={this.props.shipFullName}
          uniqueName={FULLNAME}
          validate={this.validations}
          onChange={this.handleChange.bind(this)}
          onChangeText={value =>
            this.props.paymentDetailsChanged({ prop: 'shipFullName', value })}
        />
      </CardSection>
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <Text style={styles.errorTextStyle}>
          {this.state.errors.fullName}
        </Text>
      </View>

      <CardSection>
        <InputText
          placeholder={PLACEHOLDER_STREET}
          value={this.props.shipAddrStreet}
          uniqueName={ADDRESS_STREET}
          validate={this.validations}
          onChange={this.handleChange.bind(this)}
          onChangeText={value =>
            this.props.paymentDetailsChanged({ prop: 'shipAddrStreet', value })}
        />
      </CardSection>
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <Text style={styles.errorTextStyle}>
          {this.state.errors.addrStreet}
        </Text>
      </View>

      <CardSection>
        <InputText
          placeholder={PLACEHOLDER_APT}
          value={this.props.shipAddrApt}
          uniqueName={ADDRESS_APT}
          validate={this.validations}
          onChange={this.handleChange.bind(this)}
          onChangeText={value =>
            this.props.paymentDetailsChanged({ prop: 'shipAddrApt', value })}
        />
      </CardSection>
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <Text style={styles.errorTextStyle}>
          {this.state.errors.addrApt}
        </Text>
      </View>

      <CardSection>
        <InputText
          placeholder={PLACEHOLDER_STATE}
          value={this.props.shipState}
          uniqueName={STATE}
          validate={this.validations}
          onChange={this.handleChange.bind(this)}
          onChangeText={value =>
            this.props.paymentDetailsChanged({ prop: 'shipState', value })}
        />
      </CardSection>
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <Text style={styles.errorTextStyle}>
          {this.state.errors.state}
        </Text>
      </View>

      <CardSection>
        <InputText
          placeholder={PLACEHOLDER_CITY}
          value={this.props.shipCity}
          uniqueName={CITY}
          validate={this.validations}
          onChange={this.handleChange.bind(this)}
          onChangeText={value =>
            this.props.paymentDetailsChanged({ prop: 'shipCity', value })}
        />
        <InputText
          placeholder={PLACEHOLDER_ZIP}
          value={this.props.shipZip}
          uniqueName={ZIP}
          validate={this.validations}
          onChange={this.handleChange.bind(this)}
          onChangeText={value =>
            this.props.paymentDetailsChanged({ prop: 'shipZip', value })}
        />
      </CardSection>
      <View
        style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <Text style={styles.errorTextStyle}>
          {this.state.errors.city}
        </Text>
        <Text style={styles.errorTextStyle}>
          {this.state.errors.zip}
        </Text>
      </View>
      <Button onPress={this.onShipAddressSave.bind(this)}>Save address</Button>
      <Button onPress={this.onShipAddressCancel.bind(this)}>Cancel</Button>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  const { shipFullName, error, loading,
    shipAddrStreet, shipAddrApt, shipState, shipCity, shipZip } = state.payment;
  return {
    shipFullName,
    error,
    loading,
    shipAddrStreet,
    shipAddrApt,
    shipState,
    shipCity,
    shipZip };
};

export default connect(mapStateToProps,
  { paymentDetailsChanged, resetShipAddrValues })(ShippingAddress);
