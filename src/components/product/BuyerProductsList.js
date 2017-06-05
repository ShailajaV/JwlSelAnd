/* This file fetches products list of selected seller */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import GridView from 'react-native-gridview';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { productDetailsChanged } from '../../actions';
import { CardSection } from '../common';
import BuyerProductListItem from './BuyerProductListItem';
import styles from '../common/CommonCSS';
import { PLACEHOLDER_SEARCH } from '../../actions/constants';

class BuyerProductsList extends Component {

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
    return <BuyerProductListItem product={product} />;
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
        <CardSection
          style={{
            borderColor: '#000',
            borderWidth: 1,
            margin: 4,
            alignSelf: 'stretch',
            height: 40 }}
        >
          <Icon
            name="md-search"
            size={30}
            backgroundColor="#000"
            style={styles.searchImg}
          />
          <TextInput
            placeholder={PLACEHOLDER_SEARCH}
            autoCorrect={false}
            style={[styles.inputStyle, { alignSelf: 'stretch',
            borderRadius: 5,
            borderColor: '#000',
            marginLeft: 5,
            marginRight: 5 }]}
            value={this.props.search}
            placeholderTextColor='#000'
            underlineColorAndroid='transparent'
            onChangeText={value =>
              this.props.productDetailsChanged({ prop: 'search', value })}
          />
          </CardSection>
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.pickerTextStyle}>Sort</Text>
            <Picker
              selectedValue={this.props.sortBy}
              onValueChange={value => this.props.productDetailsChanged({ prop: 'sortBy', value })}
            >
              <Picker.Item label="Best match" value="all" />
              <Picker.Item label="Price: low to high" value="ascending" />
              <Picker.Item label="Price: high to low" value="descending" />
            </Picker>
          </CardSection>

        {this.renderGridView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { search, sortBy } = state.productForm;
  const productsList = _.map(state.products, (val, id) => {
    return { ...val, id };
  });

  let products;
  products = productsList.filter(
    (product) => {
      return product.productName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }
  );
  if (sortBy === 'ascending') {
    products = _.sortBy(productsList, 'rentExpected');
  } else if (sortBy === 'descending') {
    products = _.sortBy(productsList, 'rentExpected').reverse();
  }
  return { products, search, sortBy };
};

export default connect(mapStateToProps,
  { productDetailsChanged })(BuyerProductsList);
