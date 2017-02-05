/* Product information */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection, BackgroundImage } from '../common';

class ProductForm extends Component {
  render() {
    return (
      <BackgroundImage>
        <Card>
          <CardSection>
            <Text>
              Hello
            </Text>
          </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

export default ProductForm;
