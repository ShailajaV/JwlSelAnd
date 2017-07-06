/* Review order */
import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from
'react-native-simple-radio-button';
import { Card, CardSection, Button } from '../common';
import { paymentDetailsChanged, placeOrder } from '../../actions';
import { UNDEFINED, SPACE } from '../../actions/constants';
import ShippingAddress from '../checkout/ShippingAddress';
import ItemsEstimatedCost from '../checkout/ItemsEstimatedCost';

class ReviewOrderForm extends Component {
  constructor() {
    super();
    this.state = {
      types3: [{ label: 'Select', value: 0 }],
      isSelected: false,
      shipAdrs: [],
      shipAddrView: true,
      shipAddrVisible: false,
      prefShipAddrVisible: false,
      footerVisible: true,
      payCardView: true,
      payCardVisible: false,
      prefCardVisible: false,
      continueVisible: false
    };
  }

  componentWillMount() {
    if (this.props.shipAdrs.length !== 0) this.setState({ shipAdrs: this.props.shipAdrs });
  }
  onContinue() {
    if (this.state.prefShipAddrVisible) {
        this.setState({ prefShipAddrVisible: !this.state.prefShipAddrVisible,
          footerVisible: true,
          shipAddrView: true,
          payCardView: true
        });
    } else {
        this.setState({ prefCardVisible: !this.state.prefCardVisible,
          footerVisible: true,
          shipAddrView: true,
          payCardView: true
        });
    }
    this.setState({ continueVisible: !this.state.continueVisible });
  }
  onEdit() {
    this.setState({ prefShipAddrVisible: !this.state.prefShipAddrVisible,
      footerVisible: false,
      shipAddrView: false,
      payCardView: false,
      //continueVisible: true
      //prefCardVisible: false,
      //payCardVisible: false
    });
    if (this.props.revShipAddr !== SPACE && typeof this.props.revShipAddr !== UNDEFINED) {
      this.setState({ continueVisible: true });
    }
  }
  onPaymentEdit() {
    this.setState({ prefCardVisible: !this.state.prefCardVisible,
      footerVisible: false,
      shipAddrView: false,
      payCardView: false,
      //continueVisible: false,
      //prefShipAddrVisible: false,
      //shipAddrVisible: false
    });
    //paymentshipaddr should come here
    if (this.props.revShipAddr !== SPACE && typeof this.props.revShipAddr !== UNDEFINED) {
      this.setState({ continueVisible: true });
    }
  }
  onShipAddress() {
    this.setState({ shipAddrVisible: !this.state.shipAddrVisible });
  }
  savePaymentDetails() {
    this.props.placeOrder({ cartItems: this.props.cartItems,
      shipAdrs: this.state.shipAdrs,
      shipAddrIndex: this.props.revShipAddr
      // payment details yet to implement
    });
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
      shipAdrs: this.state.shipAdrs.filter((_, i) => i !== this.props.revShipAddr),
      continueVisible: !this.state.continueVisible
    });
    this.props.paymentDetailsChanged({ prop: 'revShipAddr', value: -1 });
  }
  renderEditShipAddrs = () => {
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
                      footerVisible: false,
                      continueVisible: true
                    });
                    this.props.paymentDetailsChanged(
                    { prop: 'revShipAddr', value: valueIndex });
                  };
                  return (
                    <RadioButton labelHorizontal key={ind} >
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                      <RadioButtonInput
                        obj={obj}
                        index={ind}
                        isSelected={this.props.revShipAddr === ind}
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
            {this.props.revShipAddr === ind &&
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
  renderSelectedShipAddrs() {
    let prefAddr = {};
    let selectedAddr = <Text />;
    this.state.shipAdrs.map((addr) => {
      if (addr.prefShipAddr) prefAddr = addr;
      return prefAddr;
    });
    if (this.props.revShipAddr !== SPACE &&
      typeof this.state.shipAdrs[this.props.revShipAddr] !== UNDEFINED) {
      const splitAdd = this.state.shipAdrs[this.props.revShipAddr].address.split(',');
      const streetName = splitAdd[0];
      const aptNum = splitAdd[1];
      const stZip = `${splitAdd[2]},${splitAdd[3]},${splitAdd[4]}`;
      selectedAddr = (<Text style={{ flex: 0.6 }}>
      {'   '}{this.state.shipAdrs[this.props.revShipAddr].fullName}
      {'\n'}{'   '}{streetName}{'\n'}{'   '}
      {aptNum}{'\n'}{'   '}
      {stZip}</Text>);
    } else {
      const splitAdd = prefAddr.address.split(',');
      const streetName = splitAdd[0];
      const aptNum = splitAdd[1];
      const stZip = `${splitAdd[2]},${splitAdd[3]},${splitAdd[4]}`;
      selectedAddr = (<Text style={{ flex: 0.6 }}>
      {'   '}{prefAddr.fullName}
      {'\n'}{'   '}{streetName}{'\n'}{'   '}
      {aptNum}{'\n'}{'   '}
      {stZip}</Text>);
    }
    return selectedAddr;
  }
  renderSelectedPayment() {
    return <Text style={{ flex: 0.6 }}>Payment details</Text>;
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 0.9 }}>
        <ScrollView>
          <Card />
          <Text style={{ fontWeight: '700', alignSelf: 'center' }}>Review your order</Text>
          <Card />
          <Card style={{ flexDirection: 'column' }}>
            { this.state.shipAddrView &&
              (<View>
                <CardSection
                  style={{ flex: 1,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#87cefa' }}
                >
                  <Text style={{ flex: 0.3 }}>Sending to</Text>
                  {this.renderSelectedShipAddrs()}
                  <View style={{ flex: 0.1 }}>
                    <TouchableOpacity onPress={this.onEdit.bind(this)}>
                    <Icon
                      name='pencil'
                      size={20}
                      backgroundColor='#00fff'
                      style={{ width: 30,
                      height: 30 }}
                    />
                    </TouchableOpacity>
                  </View>
                </CardSection>
              </View>)
            }
            { this.state.prefShipAddrVisible &&
              (<View>
                <Text style={{ fontWeight: '700', alignSelf: 'center' }}>
                  Choose shipping address</Text>
                {this.renderEditShipAddrs()}
                <CardSection>
                  <Button onPress={this.onShipAddress.bind(this)}>
                    Add new address
                  </Button>
                </CardSection>
              </View>)
            }
            { this.state.shipAddrVisible &&
              (<View>
              <ShippingAddress
                onRef={ref => (this.child = ref)} shipAdrs={this.state.shipAdrs}
                shipAddrVisible={this.state.shipAddrVisible}
                shipAddrsCancel={this.shipAddrsCancel.bind(this)}
                shipAddrsUpdate={this.shipAddrsUpdate.bind(this)}
              />
              </View>
            )}
            { this.state.payCardView &&
              (<View>
                <CardSection
                  style={{ flex: 1,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#87cefa' }}
                >
                  <Text style={{ flex: 0.3 }}>Paying with</Text>
                  {this.renderSelectedPayment()}
                  <View style={{ flex: 0.1 }}>
                    <TouchableOpacity onPress={this.onPaymentEdit.bind(this)}>
                    <Icon
                      name='pencil'
                      size={20}
                      backgroundColor='#00fff'
                      style={{ width: 30,
                      height: 30 }}
                    />
                    </TouchableOpacity>
                  </View>
                </CardSection>
              </View>)
            }
            { this.state.prefCardVisible &&
              (<View>
                <Text style={{ fontWeight: '700', alignSelf: 'center' }}>
                  Choose payment cards</Text>
              </View>)
            }
          </Card>
          <ItemsEstimatedCost onRef={ref => (this.child = ref)} />
        </ScrollView>
        </View>

        { this.state.continueVisible &&
          (<View style={{ flex: 0.1, backgroundColor: '#FFA500' }}>
            <Button onPress={this.onContinue.bind(this)}>
              Continue
            </Button>
          </View>)
        }
        { this.state.footerVisible &&
          (<View style={{ flex: 0.1, backgroundColor: '#FFA500' }}>
            <Button onPress={this.savePaymentDetails.bind(this)}>
              Place order
            </Button>
          </View>)
        }
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const { shipAdrs, cards, revShipAddr } = state.payment;
  return { shipAdrs, cards, revShipAddr, cartItems: state.cartForm.cartItems };
};

export default connect(mapStateToProps, { paymentDetailsChanged, placeOrder })(ReviewOrderForm);
