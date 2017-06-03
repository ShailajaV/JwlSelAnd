/* List of all sellers */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import GridView from 'react-native-gridview';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../common/CommonCSS';
import SellerListItem from './SellerListItem';
import { PLACEHOLDER_SEARCH } from '../../actions/constants';
import { CardSection } from '../common';
import { productDetailsChanged } from '../../actions';

class SellersList extends Component {
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

  createDataSource({ sellers }) {
    const rowData = this.createRandomData(sellers);
    this.setState({ data: sellers });
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

  renderItem(seller) {
    return <SellerListItem seller={seller} />;
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
            borderColor: '#fff',
            marginLeft: 5,
            marginRight: 5 }]}
            value={this.props.search}
            placeholderTextColor='#000'
            underlineColorAndroid='transparent'
            onChangeText={value =>
              this.props.productDetailsChanged({ prop: 'search', value })}
          />
        </CardSection>
      {this.renderGridView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { search } = state.productForm;
  const sellersList = _.map(state.buyerProductForm.sellers, (val, id) => {
    return { ...val, id };
  });
  const sellers = sellersList.filter(
    (seller) => {
      return seller.companyName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }
  );
  return { sellers, search };
};

export default connect(mapStateToProps, { productDetailsChanged })(SellersList);
