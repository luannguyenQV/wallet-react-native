import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Clipboard,
  TouchableHighlight,
  Alert,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from './../../config/colors';
import Header from './../../components/header';
import { Output } from './../../components/common';

class ReceiveScreen extends Component {
  static navigationOptions = {
    title: 'Receive',
  };

  constructor() {
    super();

    this.state = {
      imageURI:
        'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=undefined&choe=UTF-8',
      email: '',
    };
  }

  async componentDidMount() {
    const user = this.props.profile;
    const imageURI =
      'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' +
      encodeURIComponent('rehive:' + user.email) +
      '&choe=UTF-8';
    this.setState({ imageURI, email: user.email });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          colors={this.props.company_config.colors}
          back
          title="Receive"
        />
        <Text style={styles.text}>
          The QR code is your public address for accepting payments.
        </Text>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: this.state.imageURI }}
        />
        <Output label="Email" value={this.state.email} copy />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
    padding: 20,
  },
  boxed: {
    flexDirection: 'column',
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightgray,
  },
  memoText: {
    flex: 1,
    padding: 2,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black,
  },
  memoIcon: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({ user, auth }) => {
  const { company_config } = auth;
  const { profile } = user;
  return { profile, company_config };
};

export default connect(mapStateToProps, {})(ReceiveScreen);
