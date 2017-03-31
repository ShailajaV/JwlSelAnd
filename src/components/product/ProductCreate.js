/* Create a product */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from '../common';
import ProductForm from './ProductForm';
import { ADD_MORE, SUBMIT } from '../../actions/constants';
import { productDetailsChanged, productCreate } from '../../actions';

class ProductCreate extends Component {

  onAddMore() {
    const errors = this.child.validations(this.props);
    if (Object.keys(errors).length === 0) {
    const { productName, daysOfRent, rentExpected, uploadURL } = this.props;
    this.props.productCreate({ uploadURL,
      productName,
      daysOfRent,
      rentExpected,
      onSubmit: false });
    }
  }

  onProductsList() {
    Actions.productsList();
  }

  onSubmit() {
    const errors = this.child.validations(this.props);
    if (Object.keys(errors).length === 0) {
      const { productName, daysOfRent, rentExpected, uploadURL } = this.props;
      this.props.productCreate({ uploadURL,
        productName,
        daysOfRent,
        rentExpected,
        onSubmit: true });
    }
  }

  render() {
    return (
      <Card style={{ backgroundColor: '#1abc9c', }}>
        <ProductForm onRef={ref => (this.child = ref)} />
        <CardSection>
          <Button onPress={this.onAddMore.bind(this)}>
            {ADD_MORE}
          </Button>
          <Button onPress={this.onSubmit.bind(this)}>
            {SUBMIT}
          </Button>
          <Button onPress={this.onProductsList.bind(this)}>
            NEXT
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { productName, daysOfRent, rentExpected, url, uploadURL } = state.productForm;
  return { productName, daysOfRent, rentExpected, url, uploadURL };
};

export default connect(mapStateToProps,
  { productDetailsChanged, productCreate })(ProductCreate);
