/* Shipping, billing and payment information */
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
//import HideableView from 'react-native-hideable-view';
import CheckBox from 'react-native-icon-checkbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from
'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { Card, CardSection, Button, InputText } from '../common';
import { paymentDetailsChanged, userDetailsChanged } from '../../actions';
import styles from '../common/CommonCSS';
import { PLACEHOLDER_FULLNAME, FULLNAME, PLACEHOLDER_STREET,
  ADDRESS_STREET, PLACEHOLDER_APT, ADDRESS_APT, PLACEHOLDER_STATE,
  STATE, PLACEHOLDER_CITY, CITY, PLACEHOLDER_ZIP, ZIP, UNDEFINED } from '../../actions/constants';
import { validateEmptyFields, validateZip } from '../common/Utils';
import SelectPaymentForm from '../checkout/SelectPaymentForm';

class PaymentForm extends Component {
  constructor() {
    super();
    this.state = {
      types3: [{ label: 'Select', value: 0 }],
      value3: 0,
      value3Index: 0,
      isSelected: false,
      errors: {},
      addrCount: 0,
      shipAdrs: [],
      isChecked: false,
      shipAddrVisible: false,
      footerVisible: false,
      payCardVisible: false
    };
    this.validations = this.validations.bind(this);
  }

  componentWillMount() {
    const { fullName, address } = this.props.user;
    const addrs = [];
    const addr = {
      radioIndex: this.state.addrCount,
      fullName,
      address,
      prefAddr: false
    };
    addrs.push(addr);
    this.setState({
        shipAdrs: addrs
    });
  }

  onShipAddress() {
    this.setState({
        shipAddrVisible: !this.state.shipAddrVisible
    });
  }

  onShipAddressCancel() {
    this.setState({
        shipAddrVisible: !this.state.shipAddrVisible
    });
  }

  onShipAddressSave() {
    const errors = this.validations(this.props);
    if (Object.keys(errors).length === 0) {
      this.setState({
          shipAddrVisible: !this.state.shipAddrVisible
      });
      let addrs = [];
      //add addresses from db
      addrs = this.state.shipAdrs;
      //if saved address is preferred then make other addresses are not preffered
      if (this.props.shipPrefAddr) {
        //If the radio button selected then footer should be visible
        this.setState({
            footerVisible: true
        });
        let eachAddr = {};
        this.state.shipAdrs.map((addObj) => {
          eachAddr = addObj;
          eachAddr.prefAddr = false;
          addrs.push(eachAddr);
          return addrs;
        });
      }
      const { shipFullName, shipAddrStreet, shipAddrApt, shipState, shipCity, shipZip }
       = this.props;
       //newly added address
      const addr = {
        radioIndex: this.state.addrCount + 1,
        fullName: shipFullName,
        address: `${shipAddrStreet},${shipAddrApt},${shipState},${shipCity},${shipZip}`,
        prefAddr: this.props.shipPrefAddr
      };
      addrs.push(addr);
      this.setState({
          addrCount: this.state.addrCount + 1,
          shipAdrs: addrs,
          isSelected: true
      });
      this.props.paymentDetailsChanged(
        { prop: 'shipAddr', value: addr.radioIndex });
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

  handlePressCheckedBox = (checked) => {
    this.setState({
      isChecked: checked,
    });
    this.props.paymentDetailsChanged({ prop: 'shipPrefAddr', value: this.state.isChecked });
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

  selectPayment() {
    this.setState({
        payCardVisible: !this.state.payCardVisible
    });
  }

  renderShipAdrrs = () => {
    const buttons = [];
    this.state.shipAdrs.map((addr, ind) => {
      const splitAdd = addr.address.split(',');
      const streetName = splitAdd[0];
      const aptNum = splitAdd[1];
      const stZip = `${splitAdd[2]},${splitAdd[3]},${splitAdd[4]}`;
      return buttons.push(
        <View key={ind}>
          <CardSection
           style={{ flexDirection: 'column',
             height: 40,
             borderRadius: 5,
             borderWidth: 1,
             borderColor: '#87cefa' }}
          >
           <RadioForm formHorizontal animation>
             {this.state.types3.map((obj) => {
               const onPress = (value, index) => {
                   this.setState({
                     value3: value,
                     value3Index: index,
                     isSelected: true,
                     footerVisible: true
                   });
                   this.props.paymentDetailsChanged(
                     { prop: 'shipAddr', value: addr.radioIndex });
                 };
               return (
                 <RadioButton labelHorizontal key={ind} >
                   {/*  You can set RadioButtonLabel before RadioButtonInput */}
                   <RadioButtonInput
                     obj={obj}
                     index={ind}
                     isSelected={this.props.shipAddr === ind &&
                       (this.state.isSelected || addr.prefAddr)}
                     onPress={onPress}
                     buttonInnerColor={'#2196f3'}
                     buttonOuterColor={'#000'}
                     buttonSize={10}
                     buttonStyle={{}}
                     buttonWrapStyle={{ marginLeft: 10 }}
                   />
                   <RadioButtonLabel
                     obj={obj}
                     index={ind}
                     labelHorizontal
                     onPress={onPress}
                     labelStyle={{ fontSize: 18, color: '#000' }}
                     labelWrapStyle={{}}
                   />
                 </RadioButton>
               );
             })}
           </RadioForm>
          </CardSection>
          <CardSection
            style={{ flexDirection: 'column',
            height: 130,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#87cefa' }}
          >
            <CardSection>
             <Text>{'   '}{addr.fullName}{'\n'}{'   '}{streetName}{'\n'}{'   '}{aptNum}{'\n'}{'   '}
             {stZip}</Text>
             </CardSection>
             <CardSection style={{ alignItems: 'flex-end' }}>
              <Button>EDIT</Button>
              <Button>DELETE</Button>
            </CardSection>
          </CardSection>
          <CardSection />
          <CardSection />
        </View>
      );
    });
    return buttons;
  }

  render() {
    console.log('this.state.footerVisible ', this.state.footerVisible);
    return (
      <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
      <ScrollView style={{ backgroundColor: '#fff' }}>
      <Card>
        <CardSection style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text>Choose shipping address</Text>
        </CardSection>
        {this.renderShipAdrrs()}
        <CardSection>
          <Button onPress={this.onShipAddress.bind(this)}>
            Add new address
          </Button>
        </CardSection>
      </Card>

      { this.state.shipAddrVisible &&
        (<View>
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

        <CardSection>
        <CheckBox
           label='Set as preferred address'
           size={30}
           checked={this.state.isChecked}
           onPress={this.handlePressCheckedBox}
        />
        </CardSection>
        <Button onPress={this.onShipAddressSave.bind(this)}>Save address</Button>
        <Button onPress={this.onShipAddressCancel.bind(this)}>Cancel</Button>
        </View>
      )}

      { this.state.payCardVisible &&
        (<View>
        <SelectPaymentForm onRef={ref => (this.child = ref)} />
      </View>
    )}

    </ScrollView>
    </View>
    { this.state.footerVisible &&
      (<View style={{ flex: 0.1 }}>
          <Button onPress={this.selectPayment.bind(this)}>
            Continue
          </Button>
     </View>
   )}
          </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { shipFullName, error, loading,
    shipAddrStreet, shipAddrApt, shipState, shipCity, shipZip, shipAddr } = state.payment;
  return { user: state.user,
    shipAddr,
    shipFullName,
    error,
    loading,
    shipAddrStreet,
    shipAddrApt,
    shipState,
    shipCity,
    shipZip };
};

export default connect(mapStateToProps, { paymentDetailsChanged, userDetailsChanged })(PaymentForm);
