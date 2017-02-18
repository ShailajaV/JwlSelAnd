/* This file fetches products list */
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { BackgroundImage } from '../common';
import { getProductDetails } from '../../actions';
import ProductListItem from './ProductListItem';

class ProductsList extends Component {
  componentWillMount() {
    this.props.getProductDetails();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ products }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(products);
  }

  renderRow(product) {
    return <ProductListItem product={product} />;
  }

  render() {
    return (
      <BackgroundImage>
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
      </BackgroundImage>
    );
  }
}

const mapStateToProps = state => {
  const products = _.map(state.products, (val, uid) => {
    return { ...val, uid };
  });
  return { products };
};

export default connect(mapStateToProps, { getProductDetails })(ProductsList);
