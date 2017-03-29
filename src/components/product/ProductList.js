/* This file fetches products list */
import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import GridView from 'react-native-gridview';
import { connect } from 'react-redux';
import { getProductDetails } from '../../actions';
import ProductListItem from './ProductListItem';
import styles from '../common/CommonCSS';

class ProductsList extends Component {

  constructor(props) {
    super(props);
    const data = null;

    this.state = {
      data,
      itemsPerRow: 3,
      variableContent: false,
      useRandomCounts: false,
    };
  }

  componentWillMount() {
    this.props.getProductDetails();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ products }) {
    const rowData = this.createRandomData(products);
    this.setState({ data: products });
    return new GridView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }).cloneWithRowsAndSections(rowData);
  }

  createRandomData(data) {
    return {
      'Section 1': this.createRandomRows(data)
    };
  }

  createRandomRows(data) {
    const { itemsPerRow } = this.state;
    const rowData = [];
    for (let i = 0; i < data.length; i) {
      const endIndex = Math.max(Math.round(Math.random() * itemsPerRow), 1) + i;
      rowData.push(data.slice(i, endIndex));
      i = endIndex;
    }
    return rowData;
  }

  renderItem(product) {
    return <ProductListItem product={product} />;
  }

  renderGridView() {
    return (
      <GridView
        data={this.state.data}
        dataSource={this.dataSource}
        padding={4}
        itemsPerRow={this.state.itemsPerRow}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderGridView()}
      </View>
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
