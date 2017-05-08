/* Fetch Seller profile data */
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { userProfileInfo } from '../../actions';
import SellerProfileForm from './SellerProfileForm';
import BuyerProductList from '../product/BuyerProductList';

class UserProfile extends Component {
  componentWillMount() {
    this.props.userProfileInfo();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ users }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(users);
  }

  renderRow(user) {
    if (user.isBuyer) return <BuyerProductList />;
    return <SellerProfileForm seller={user} />;
  }
  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={{ backgroundColor: '#1abc9c' }}
      />
    );
  }
}

const mapStateToProps = state => {
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });
  return { users };
};

export default connect(mapStateToProps, { userProfileInfo })(UserProfile);
