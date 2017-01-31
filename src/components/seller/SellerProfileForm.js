/* Seller profile form */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from '../common';
import { LABEL_SELLER_NAME,
  LABEL_COMPANY_NAME,
  LABEL_SELLER_ADDRESS } from '../../actions/constants';
import { sellerProfileChanged } from '../../actions';

class SellerListItem extends Component {
  componentWillMount() {
    _.each(this.props.seller, (value, prop) => {
      this.props.sellerProfileChanged({ prop, value });
    });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label={LABEL_SELLER_NAME}
            value={this.props.fullName}
            onChangeText={value =>
              this.props.sellerProfileChanged({ prop: 'fullName', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label={LABEL_COMPANY_NAME}
            value={this.props.companyName}
            onChangeText={value =>
              this.props.sellerProfileChanged({ prop: 'companyName', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label={LABEL_SELLER_ADDRESS}
            value={this.props.address}
            onChangeText={value =>
              this.props.sellerProfileChanged({ prop: 'address', value })}
          />
        </CardSection>

        <CardSection>
          <Button>
            Save
          </Button>
       </CardSection>
      </Card>
    );
  }
}

  const mapStateToProps = (state) => {
    const { fullName, companyName, address } = state.sellerForm;
    return { fullName, companyName, address };
  };


  export default connect(mapStateToProps,
    { sellerProfileChanged })(SellerListItem);
