/* Create a product */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from '../common';
import ProductForm from './ProductForm';
import { ADD_MORE, SUBMIT } from '../../actions/constants';
import { productDetailsChanged, productCreate } from '../../actions';

class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
       visible: false
    };
  }

  componentWillMount() {
    setInterval(() => {
      if (!this.state.visible) {
        this.setState({
          visible: !this.state.visible
        });
      }
    }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  onAddMore() {
    const errors = this.child.validations(this.props);
    if (Object.keys(errors).length === 0) {
    const { productName, daysOfRent, rentExpected, uploadURL,
      shippingCost, estTax, quantity } = this.props;
    this.props.productCreate({ uploadURL,
      productName,
      daysOfRent,
      rentExpected,
      shippingCost,
      estTax,
      quantity,
      onSubmit: false });
    }
  }

  onSubmit() {
    const errors = this.child.validations(this.props);
    if (Object.keys(errors).length === 0) {
      const { productName, daysOfRent, rentExpected, uploadURL,
        shippingCost, estTax, quantity } = this.props;
      this.props.productCreate({ uploadURL,
        productName,
        daysOfRent,
        rentExpected,
        shippingCost,
        estTax,
        quantity,
        onSubmit: true });
    }
  }

  renderAddButton() {
    if (this.props.loading) {
      return <Spinner visible={this.state.visible} />;
    }
    return (
      <Button onPress={this.onAddMore.bind(this)}>
        {ADD_MORE}
      </Button>
    );
  }

  renderSubmitButton() {
    if (this.props.submitLoading) {
      return <Spinner visible={this.state.visible} />;
    }
    return (
      <Button onPress={this.onSubmit.bind(this)}>
        {SUBMIT}
      </Button>
    );
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Card>
          <ProductForm onRef={ref => (this.child = ref)} />
          <CardSection>
            {this.renderAddButton()}
            {this.renderSubmitButton()}
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { productName, daysOfRent, rentExpected, url, uploadURL,
    shippingCost, estTax, quantity, loading,
    submitLoading } = state.productForm;
  return { productName,
    daysOfRent,
    rentExpected,
    url,
    uploadURL,
    shippingCost,
    estTax,
    quantity,
    loading,
    submitLoading };
};

export default connect(mapStateToProps,
  { productDetailsChanged, productCreate })(ProductCreate);
