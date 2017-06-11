/* Edit the  product */
import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { productDetailsChanged, productUpdate } from '../../actions';
import { Card, CardSection, Button, Spinner } from '../common';
import ProductForm from './ProductForm';
import { EDIT, SPINNER_SIZE } from '../../actions/constants';

class ProductEdit extends Component {

  componentWillMount() {
    _.each(this.props.product, (value, prop) => {
      this.props.productDetailsChanged({ prop, value });
    });
  }

  onEdit() {
    const errors = this.child.validations(this.props);
    if (Object.keys(errors).length === 0) {
    const { productName, daysOfRent, rentExpected, url, uploadURL, shippingCost, estTax, quantity }
      = this.props;
    this.props.productUpdate({ productName,
      daysOfRent,
      rentExpected,
      shippingCost,
      estTax,
      quantity,
      url,
      uploadURL,
      uid: this.props.product.uid });
    }
  }

  renderEditButton() {
    if (this.props.loading) {
      return <Spinner size={SPINNER_SIZE} />;
    }
    return (
      <Button onPress={this.onEdit.bind(this)}>
        {EDIT}
      </Button>
    );
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Card>
          <ProductForm onRef={ref => (this.child = ref)} />
          <CardSection>
            {this.renderEditButton()}
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { productName, daysOfRent, rentExpected, url, uploadURL,
    shippingCost, estTax, quantity, loading } = state.productForm;
  return { productName,
    daysOfRent,
    rentExpected,
    url,
    uploadURL,
    shippingCost,
    estTax,
    quantity,
    loading };
};

export default connect(mapStateToProps, { productDetailsChanged, productUpdate })(ProductEdit);
