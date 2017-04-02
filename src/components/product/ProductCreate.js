/* Create a product */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, Spinner } from '../common';
import ProductForm from './ProductForm';
import { ADD_MORE, SUBMIT, SPINNER_SIZE } from '../../actions/constants';
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

  renderAddButton() {
    if (this.props.loading) {
      return <Spinner size={SPINNER_SIZE} />;
    }
    return (
      <Button onPress={this.onAddMore.bind(this)}>
        {ADD_MORE}
      </Button>
    );
  }

  renderSubmitButton() {
    if (this.props.submitLoading) {
      return <Spinner size={SPINNER_SIZE} />;
    }
    return (
      <Button onPress={this.onSubmit.bind(this)}>
        {SUBMIT}
      </Button>
    );
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#1abc9c' }}>
        <Card>
          <ProductForm onRef={ref => (this.child = ref)} />
          <CardSection>
            {this.renderAddButton()}
            {this.renderSubmitButton()}
            <Button onPress={this.onProductsList.bind(this)}>
              NEXT
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { productName, daysOfRent, rentExpected, url, uploadURL, loading,
    submitLoading } = state.productForm;
  return { productName, daysOfRent, rentExpected, url, uploadURL, loading, submitLoading };
};

export default connect(mapStateToProps,
  { productDetailsChanged, productCreate })(ProductCreate);
