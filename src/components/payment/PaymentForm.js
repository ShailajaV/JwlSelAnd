/* Shipping, billing and payment information */
import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from
'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import { paymentDetailsChanged, reviewOrder } from '../../actions';
import ShippingAddress from '../checkout/ShippingAddress';
//import SelectPaymentForm from '../checkout/SelectPaymentForm';
import { SPACE, UNDEFINED } from '../../actions/constants';

class PaymentForm extends Component {
  constructor() {
    super();
    this.state = {
      types3: [{ label: 'Select', value: 0 }],
      isSelected: false,
      shipAdrs: [],
      shipAddrVisible: false,
      footerVisible: false,
      payCardVisible: false
    };
  }

  componentWillMount() {
    if (this.props.shipAdrs.length !== 0) this.setState({ shipAdrs: this.props.shipAdrs });
    else {
      const { fullName, address } = this.props.user;
      const addrs = [];
      const addr = {
        fullName,
        address
      };
      addrs.push(addr);
      this.setState({ shipAdrs: addrs });
    }
  }

  onShipAddress() {
    this.setState({ shipAddrVisible: !this.state.shipAddrVisible });
  }

  onShipAddrEdit() {
    this.setState({
      payCardVisible: !this.state.payCardVisible
    });
  }

  selectPayment() {
    this.setState({ payCardVisible: !this.state.payCardVisible });
  }

  shipAddrsUpdate(shipAddrVisible, addrs, footerVisible) {
    this.setState({
      shipAddrVisible,
      shipAdrs: addrs,
      footerVisible
    });
  }

  shipAddrsCancel(shipAddrVisible) {
    this.setState({ shipAddrVisible });
  }

  shipAddrDelete() {
    this.setState({
      shipAdrs: this.state.shipAdrs.filter((_, i) => i !== this.props.shipAddr),
      footerVisible: !this.state.footerVisible
    });
    this.props.paymentDetailsChanged({ prop: 'shipAddr', value: -1 });
  }

  footerVisibleUpdate(footerVisible) {
    this.setState({ footerVisible });
  }

  savePaymentDetails() {
    this.props.reviewOrder({ shipAdrs: this.state.shipAdrs,
      shipAddrIndex: this.props.shipAddr
      // payment details yet to implement
    });
  }

  renderShipAddrs = () => {
    const buttons = [];
    this.state.shipAdrs.map((addr, ind) => {
      const splitAdd = addr.address.split(',');
      const streetName = splitAdd[0];
      const aptNum = splitAdd[1];
      const stZip = `${splitAdd[2]},${splitAdd[3]},${splitAdd[4]}`;
      return buttons.push(
        <View
          key={ind}
          style={{ flex: 1,
            flexDirection: 'row',
            borderWidth: 1,
            height: 130,
            borderRadius: 5,
            borderColor: '#87cefa' }}
        >
          <CardSection style={{ flex: 0.8 }}>
            <CardSection style={{ flexDirection: 'column' }}>
              <RadioForm formHorizontal animation>
                  {this.state.types3.map((obj) => {
                  const onPress = (_, valueIndex) => {
                    this.setState({
                      isSelected: true,
                      footerVisible: true
                    });
                    this.props.paymentDetailsChanged(
                    { prop: 'shipAddr', value: valueIndex });
                  };
                  return (
                    <RadioButton labelHorizontal key={ind} >
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                      <RadioButtonInput
                        obj={obj}
                        index={ind}
                        isSelected={this.props.shipAddr === ind &&
                        (this.state.isSelected)}
                        onPress={onPress}
                        buttonSize={10}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={ind}
                        labelHorizontal
                        onPress={onPress}
                      />
                    </RadioButton>
                  );
                })}
              </RadioForm>
              <Text>{'   '}{addr.fullName}{'\n'}{'   '}{streetName}{'\n'}{'   '}
              {aptNum}{'\n'}{'   '}
              {stZip}</Text>
            </CardSection>
          </CardSection>
          <CardSection style={{ flex: 0.2, flexDirection: 'column' }}>
            <CardSection />
            {this.props.shipAddr === ind && (this.state.isSelected) &&
            (<TouchableOpacity
              style={{ borderWidth: 1, borderColor: '#87cefa' }}
              onPress={this.shipAddrDelete.bind(this)}
            >
              <Text style={{ alignSelf: 'center', fontSize: 13, fontWeight: '700', }}>
              DELETE</Text>
            </TouchableOpacity>)}
          </CardSection>
          <CardSection />
          <CardSection />
        </View>
      );
    });
    return buttons;
  }

  render() {
    let selectedAddr = <Text />;
    if (this.props.shipAddr !== SPACE && typeof this.props.shipAddr !== UNDEFINED &&
       this.state.shipAdrs.length !== 0 &&
       typeof this.state.shipAdrs[this.props.shipAddr] !== UNDEFINED) {
      const splitAdd = this.state.shipAdrs[this.props.shipAddr].address.split(',');
      const streetName = splitAdd[0];
      const aptNum = splitAdd[1];
      const stZip = `${splitAdd[2]},${splitAdd[3]},${splitAdd[4]}`;
      selectedAddr = (<Text>Sending to{'\n'}
      {'   '}{this.state.shipAdrs[this.props.shipAddr].fullName}
      {'\n'}{'   '}{streetName}{'\n'}{'   '}
      {aptNum}{'\n'}{'   '}
      {stZip}</Text>);
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 0.9 }}>
          <ScrollView>
            { this.state.payCardVisible &&
              (<View>
                <Card
                  style={{ flex: 1,
                    flexDirection: 'row',
                    height: 130,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#87cefa' }}
                >
                  <CardSection style={{ flex: 0.8 }}>
                    {selectedAddr}
                  </CardSection>
                  <CardSection style={{ flex: 0.2, borderWidth: 0 }}>
                    <TouchableOpacity
                      onPress={this.onShipAddrEdit.bind(this)}
                    ><Text>EDIT</Text>
                    </TouchableOpacity>
                  </CardSection>
                </Card>
              </View>)
            }

            { !this.state.payCardVisible &&
              (<View>
                <Card>
                  <CardSection style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text>Choose shipping address</Text>
                  </CardSection>
                  {this.renderShipAddrs()}
                  <CardSection>
                    <Button onPress={this.onShipAddress.bind(this)}>
                      Add new address
                    </Button>
                  </CardSection>
                </Card>
              </View>)
            }

            { this.state.shipAddrVisible && !this.state.payCardVisible &&
              (<View>
              <ShippingAddress
                onRef={ref => (this.child = ref)} shipAdrs={this.state.shipAdrs}
                shipAddrVisible={this.state.shipAddrVisible}
                shipAddrsCancel={this.shipAddrsCancel.bind(this)}
                //footerVisible={this.state.footerVisible}
                shipAddrsUpdate={this.shipAddrsUpdate.bind(this)}
                //footerVisibleUpdate={this.footerVisibleUpdate.bind(this)}
              />
              </View>
            )}

            { this.state.payCardVisible &&
              (<View>
                <Text>Payment details</Text>
                {/*// payment details yet to implement
                  <SelectPaymentForm onRef={ref => (this.child = ref)} />*/}
              </View>
            )}
          </ScrollView>
        </View>
        { this.state.footerVisible && this.state.shipAdrs.length !== 0 &&
          (<View style={{ flex: 0.1, backgroundColor: '#FFA500' }}>
            { !this.state.payCardVisible &&
              (<Button onPress={this.selectPayment.bind(this)}>
                Continue
              </Button>)
            }
            { this.state.payCardVisible &&
              (<Button onPress={this.savePaymentDetails.bind(this)}>
                Review your order
              </Button>)
            }
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { shipFullName, error, loading, shipAddrStreet, shipAddrApt, shipState, shipCity, shipZip,
    shipAddr, shipAdrs, cards } = state.payment;
  return { user: state.user,
    shipAddr,
    shipFullName,
    error,
    loading,
    shipAddrStreet,
    shipAddrApt,
    shipState,
    shipCity,
    shipZip,
    shipAdrs,
    cards };
};

export default connect(mapStateToProps,
  { paymentDetailsChanged, reviewOrder })(PaymentForm);
