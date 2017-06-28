/* Shipping, billing and payment information */
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from
'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import { paymentDetailsChanged, userDetailsChanged } from '../../actions';
import ShippingAddress from '../checkout/ShippingAddress';
import SelectPaymentForm from '../checkout/SelectPaymentForm';

class PaymentForm extends Component {
  constructor() {
    super();
    this.state = {
      types3: [{ label: 'Select', value: 0 }],
      value3: 0,
      value3Index: 0,
      isSelected: false,
      shipAdrs: [],
      shipAddrVisible: false,
      footerVisible: false,
      payCardVisible: false
    };
  }

  componentWillMount() {
    const { fullName, address } = this.props.user;
    const addrs = [];
    const addr = {
      radioIndex: 0,
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

  selectPayment() {
    this.setState({
        payCardVisible: !this.state.payCardVisible
    });
  }

  shipAddrsUpdate(shipAddrVisible, addrs, addrCount) {
    this.setState({
      shipAddrVisible,
      shipAdrs: addrs,
      addrCount
     });
  }

  footerVisibleUpdate(footerVisible) {
    this.setState({ footerVisible });
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
              <ShippingAddress
                onRef={ref => (this.child = ref)} shipAdrs={this.state.shipAdrs}
                shipAddrVisible={this.state.shipAddrVisible}
                footerVisible={this.state.footerVisible}
                shipAddrsUpdate={this.shipAddrsUpdate.bind(this)}
                footerVisibleUpdate={this.footerVisibleUpdate.bind(this)}
              />
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
