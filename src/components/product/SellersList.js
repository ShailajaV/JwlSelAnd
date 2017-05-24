/* List of all sellers */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import GridView from 'react-native-gridview';
import styles from '../common/CommonCSS';
import { SPACE, UNDEFINED } from '../../actions/constants';

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
    //this.props.getAllProductDetails();

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

  /*renderItem(product) {
    return <BuyerProductListItem product={product} />;
  }*/

  renderGridView() {
    return (
      <GridView
        data={this.state.data}
        dataSource={this.dataSource}
        padding={4}
        itemsPerRow={this.state.itemsPerRow}
        renderItem={(item) => {
          let srcImg = SPACE;
          if (typeof item.profilePic === UNDEFINED || item.profilePic === SPACE) {
            srcImg = require('../common/images/empty.png');
          } else {
            srcImg = { uri: item.profilePic };
          }
          return (
            <ScrollView>
              <View
                style={[
                  styles.item,
                  styles.itemSpacing
                ]}
              >
                <View style={{ flex: 1, backgroundColor: '#8F8', borderWidth: 1 }}>
                  <View style={[styles.upload, styles.uploadContainer, { marginBottom: 20 }]}>
                    <Image style={styles.upload} source={srcImg} />
                  </View>
                  <Text>{`${item.fullName}`}</Text>
                </View>
              </View>
            </ScrollView>
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
  const sellers = _.map(state.buyerProductForm.sellers, (val, uid) => {
    return { ...val, uid };
  });
  return { sellers };
};

export default connect(mapStateToProps)(SellersList);
