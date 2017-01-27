/* Seller Profile information */
import React, { Component } from 'react';
//import { Text } from 'react-native';
import { Card, CardSection, BackgroundImage, Input } from '../common';
import { LABEL_SELLER_NAME, PLACEHOLDER_SELLER_NAME, LABEL_COMPANY_NAME,
  PLACEHOLDER_COMPANY_NAME, LABEL_SELLER_ADDRESS,
  PLACEHOLDER_SELLER_ADDRESS } from '../../actions/constants';

class SellerProfileForm extends Component {
  render() {
    return (
      <BackgroundImage>
        <Card>
          <CardSection>
            <Input
              label={LABEL_SELLER_NAME}
              placeholder={PLACEHOLDER_SELLER_NAME}
              //onChangeText={this.onEmailChange.bind(this)}
              //value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_COMPANY_NAME}
              placeholder={PLACEHOLDER_COMPANY_NAME}
              //onChangeText={this.onEmailChange.bind(this)}
              //value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_SELLER_ADDRESS}
              placeholder={PLACEHOLDER_SELLER_ADDRESS}
              //onChangeText={this.onEmailChange.bind(this)}
              //value={this.props.email}
            />
          </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

export default SellerProfileForm;
