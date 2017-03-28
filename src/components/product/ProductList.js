/* This file fetches products list */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import GridView from 'react-native-gridview';
import { Actions } from 'react-native-router-flux';
//import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { getProductDetails } from '../../actions';
import ProductListItem from './ProductListItem';
import styles from '../common/CommonCSS';
import { DAYS, DOLLAR, PER_DAY } from '../../actions/constants';

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

  onEdit() {
    Actions.productEdit({ product: this.props.product });
  }
  onDelete() {
    const { productName } = this.props.product;
    this.props.productDelete({ uid: this.props.product.uid, productName });
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

  renderGridView() {
    return (
      <GridView
        data={this.state.data}
        /** `dataSource` will override `data` */
        dataSource={this.dataSource}
        padding={4}
        itemsPerRow={this.state.itemsPerRow}
        /** You can set different item counts for portrait and/or landscape mode */
        // itemsPerRowPortrait={4}
        // itemsPerRowLandscape={7}
        renderItem={(item) => {
          console.log('items is ', item);
          return (
            <View
              key={item.key}
              style={[
                styles.item,
                styles.itemSpacing,
                { backgroundColor: item.backgroundColor },
              ]}
            >

              <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
                <Image style={styles.upload} source={{ uri: item.url }} />
              </View>
              <View style={styles.prdContainerStyle}>
                <Text style={styles.prdLabelStyle}>{item.productName}</Text>
                <Text style={styles.prdLabelStyle}>{item.daysOfRent} {DAYS}</Text>
                <Text style={styles.prdLabelStyle}>{DOLLAR}{item.rentExpected} {PER_DAY}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={this.onEdit.bind(this)}>
                  <Image
                    source={require('../common/images/edit.png')}
                    style={styles.imageStyle}
                    resizeMode={Image.resizeMode.sretch}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDelete.bind(this)}>
                <Image
                  source={require('../common/images/delete.jpeg')}
                  style={styles.imageStyle}
                  resizeMode={Image.resizeMode.sretch}
                />
              </TouchableOpacity>
              </View>
            </View>
          );
        }}
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
