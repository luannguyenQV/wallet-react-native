import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import Colors from './../../../config/colors';
import Header from './../../../components/header';

import {
  InputContainer,
  Input,
  Button,
  PopUpGeneral,
} from './../../../components/common';

class PinScreen extends Component {
  static navigationOptions = {
    title: 'Update pin',
  };

  state = {
    old_pin: '',
    new_pin1: '',
    new_pin2: '',
    modalVisible: false,
    modalText: '',
    modalAction: null,
  };

  save() {
    if (responseJson.status === 'success') {
      modalText = 'Pin updated';
      modalAction = () => this.props.navigation.goBack();
    } else {
      modalText = 'Error: ' + responseJson.message;
      modalAction = () => this.setState({ modalVisible: false });
    }
    this.setState({ modalText, modalAction });
  }

  render() {
    const {
      modalVisible,
      modalAction,
      modalText,
      old_pin,
      new_pin1,
      new_pin2,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Pin" />
        <InputContainer>
          <Input
            type="pin"
            label="Old pin"
            placeholder="e.g. 1234"
            autoCapitalize="none"
            value={old_pin}
            underlineColorAndroid="white"
            onChangeText={old_pin => this.setState({ old_pin })}
          />
          <Input
            type="pin"
            label="New pin"
            autoCapitalize="none"
            placeholder="e.g. 1234"
            value={new_pin1}
            onChangeText={new_pin1 => this.setState({ new_pin1 })}
            underlineColorAndroid="white"
          />

          <Input
            type="pin"
            label="Confirm new pin"
            autoCapitalize="none"
            placeholder="e.g. 1234"
            value={new_pin2}
            underlineColorAndroid="white"
            onChangeText={new_pin2 => this.setState({ new_pin2 })}
          />

          <Button
            label="CONFIRM"
            // type="contained"
            onPress={() => this.save()}
          />
          <PopUpGeneral
            visible={modalVisible}
            contentText={modalText}
            textActionOne={'Close'}
            onPressActionOne={modalAction}
            onDismiss={modalAction}
          />
        </InputContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  comment: {
    flex: 2,
    backgroundColor: Colors.lightgray,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  commentText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
  },
  pinInfo: {
    flex: 2,
    flexDirection: 'column',
    padding: 20,
  },
});

export default PinScreen;
