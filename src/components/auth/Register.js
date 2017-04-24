/* Usr registration */
import React, { Component } from 'react';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import PersonalRegisterForm from './PersonalRegisterForm';
import BusinessRegisterForm from './BusinessRegisterForm';

class Register extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Personal account' },
      { key: '2', title: 'Business account' },
    ],
  };

  handleChangeTab = (index) => {
    this.setState({ index });
  };

  renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <PersonalRegisterForm />;
    case '2':
      return <BusinessRegisterForm />;
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={{ flex: 1 }}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onRequestChangeTab={this.handleChangeTab}
      />
    );
  }
}

export default Register;
