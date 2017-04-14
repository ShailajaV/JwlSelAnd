import React, { Component } from 'react';
import {
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import styles from '../common/CommonCSS';

const SIZES = ['small', 'normal', 'large'];

class Spinner extends Component {

  static propTypes = {
    visible: React.PropTypes.bool,
    cancelable: React.PropTypes.bool,
    color: React.PropTypes.string,
    size: React.PropTypes.oneOf(SIZES),
    overlayColor: React.PropTypes.string
  };

  static defaultProps = {
    visible: false,
    cancelable: false,
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  constructor(props) {
    super(props);
    this.state = { visible: this.props.visible };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  close() {
    this.setState({ visible: false });
  }

  handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  renderDefaultContent() {
    return (
      <View style={styles.spinnerBackground}>
        <ActivityIndicator
          color={this.props.color}
          size={this.props.size}
          style={{ flex: 1 }}
        />
      </View>
    );
  }

  renderSpinner() {
    const { visible } = this.state;

    if (!visible) {
      return (
        <View />
      );
    }

    const spinner = (
      <View
      style={[
        styles.spinnerContainer,
        { backgroundColor: this.props.overlayColor }
      ]} key={`spinner_${Date.now()}`}
      >
        {this.props.children ? this.props.children : this.renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        onRequestClose={() => this.handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this.renderSpinner();
  }

}

export { Spinner };
