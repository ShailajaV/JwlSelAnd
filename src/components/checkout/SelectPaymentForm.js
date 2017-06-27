import React, { Component } from 'react';
import { View } from 'react-native';
import { AddCard, SelectPayment } from 'react-native-stripe-checkout';

class SelectPaymentForm extends Component {
  constructor() {
    super();
    this.addCard = this.addCard.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  addCard() {
    //Actions.addCard();
    console.log('addCard');
  }
  render() {
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
    <SelectPayment
      enableApplePay={false} // optional, default: false
      applePayHandler={() => console.log('apple pay is go')}
      paymentSources={[{}]} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for exact format.
      selectPaymentHandler={(paymentSource) => console.log(paymentSource)}
      fontFamily="" // Optional, Default: iOS default
      fontSize={16} // Optional, Default: iOS default
      //more custom styles

    />

    <AddCard
      createCardHandler={(cardDetails) => console.log(cardDetails)}
      invalidStyle={{ borderColor: 'red' }} // Optional. Default: {borderColor: 'red'}
      fontFamily="" // Optional, Default: iOS default
      fontSize={16} // Optional, Default: iOS default
    />
    </View>
  );
}
}

export default SelectPaymentForm;
