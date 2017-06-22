import React, { Component } from 'react';
import { View } from 'react-native';
import { SelectPayment, AddCard } from 'react-native-checkout';
//import { Actions } from 'react-native-router-flux';

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
        applePayHandler={() => console.log('apple pay happened')} // optional
        paymentSources={[
          { last4: '1234', brand: 'American Express', more: 'stuff' },
          { last4: '2345', brand: 'Visa', more: 'stuff' },
          { last4: '2345', brand: 'Master Card', more: 'stuff' },
        ]} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for Stripe format.
        addCardHandler={this.addCard.bind(this)}
        selectPaymentHandler={(paymentSource) => console.log(paymentSource)}
      />
      <AddCard
        addCardHandler={(cardNumber, cardExpiry, cardCvc) => {
          console.log(`${cardNumber} ${cardExpiry} ${cardCvc}`);
          return Promise.resolve(cardNumber); //return a promise when you're done
        }}
        styles={{}} // Override default styles <LINK HERE>
        onCardNumberBlur={() => console.log('card number blurred')}
        onCardNumberFocus={() => console.log('card number focused')}
        onCvcFocus={() => console.log('cvc focused')}
        onCvcBlur={() => console.log('cvc blurred')}
        onExpiryFocus={() => console.log('expiry focused')}
        onExpiryBlur={() => console.log('expiry blurred')}
        onScanCardClose={() => console.log('scan card closed')}
        onScanCardOpen={() => console.log('scan card opened')}
        activityIndicatorColor="pink"
        addCardButtonText="Add Card"
        scanCardButtonText="Scan Card"
        scanCardAfterScanButtonText="Scan Card Again"
      />
    </View>
  );
}
}

export default SelectPaymentForm;
