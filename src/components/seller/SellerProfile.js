/* Fetch Seller profile data */
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { sellerProfileInfo } from '../../actions';
import SellerProfileForm from './SellerProfileForm';
import { BackgroundImage } from '../common';

class SellerProfile extends Component {
  componentWillMount() {
    this.props.sellerProfileInfo();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ sellers }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(sellers);
  }

  renderRow(seller) {
    return <SellerProfileForm seller={seller} />;
  }

  render() {
    return (

        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      
    );
  }
}

const mapStateToProps = state => {
  const sellers = _.map(state.sellers, (val, uid) => {
    return { ...val, uid };
  });
  return { sellers };
};

export default connect(mapStateToProps, { sellerProfileInfo })(SellerProfile);
