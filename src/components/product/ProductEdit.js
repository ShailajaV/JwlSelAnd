/* Edit the  product */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productDetailsChanged, productUpdate } from '../../actions';
import { BackgroundImage, Card, CardSection, Button } from '../common';
import ProductForm from './ProductForm';
import { EDIT } from '../../actions/constants';

class ProductEdit extends Component {

  componentWillMount() {
    _.each(this.props.product, (value, prop) => {
      this.props.productDetailsChanged({ prop, value });
    });
  }

  onEdit() {
    const errors = this.child.validations(this.props);
    if (Object.keys(errors).length === 0) {
    const { productName, daysOfRent, rentExpected, url, uploadURL } = this.props;
    this.props.productUpdate({ productName,
      daysOfRent,
      rentExpected,
      url,
      uploadURL,
      uid: this.props.product.uid });
    }
  }

  render() {
    return (
      <BackgroundImage>
        <Card>
        <ProductForm onRef={ref => (this.child = ref)} />
          <CardSection>
            <Button onPress={this.onEdit.bind(this)}>
              {EDIT}
            </Button>
          </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = (state) => {
  const { productName, daysOfRent, rentExpected, url, uploadURL } = state.productForm;
  return { productName, daysOfRent, rentExpected, url, uploadURL };
};

export default connect(mapStateToProps, { productDetailsChanged, productUpdate })(ProductEdit);
