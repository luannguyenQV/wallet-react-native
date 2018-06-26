import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Colors from './../../../config/colors';
import Header from './../../../components/header';

import {
  InputContainer,
  Input,
  Button,
  PopUpGeneral,
  FullScreenForm,
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

  renderMainContainer() {
    const { buttonStyle } = styles;
    let pinState = 'landing';

    switch (pinState) {
      case 'landing':
        console.log(pinState);
        return (
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => console.log('fingerprint')}>
              <View style={buttonStyle}>
                <Text>Fingerprint</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('pin')}>
              <View style={buttonStyle}>
                <Text>Pin</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
  }

  render() {
    const {
      modalVisible,
      modalAction,
      modalText,
      old_pin,
      new_pin1,
      new_pin2,
      loading,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title="Send" back />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps={'never'}
          style={styles.viewStyleContainer}
          behavior={'padding'}>
          <FullScreenForm loading={loading}>
            {this.renderMainContainer()}
          </FullScreenForm>
        </KeyboardAvoidingView>
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Header navigation={this.props.navigation} back title="Pin" />
    //     <InputContainer>
    //       <Input
    //         type="pin"
    //         label="Old pin"
    //         placeholder="e.g. 1234"
    //         autoCapitalize="none"
    //         value={old_pin}
    //         underlineColorAndroid="white"
    //         onChangeText={old_pin => this.setState({ old_pin })}
    //       />
    //       <Input
    //         type="pin"
    //         label="New pin"
    //         autoCapitalize="none"
    //         placeholder="e.g. 1234"
    //         value={new_pin1}
    //         onChangeText={new_pin1 => this.setState({ new_pin1 })}
    //         underlineColorAndroid="white"
    //       />

    //       <Input
    //         type="pin"
    //         label="Confirm new pin"
    //         autoCapitalize="none"
    //         placeholder="e.g. 1234"
    //         value={new_pin2}
    //         underlineColorAndroid="white"
    //         onChangeText={new_pin2 => this.setState({ new_pin2 })}
    //       />

    //       <Button
    //         label="CONFIRM"
    //         // type="contained"
    //         onPress={() => this.save()}
    //       />
    //       <PopUpGeneral
    //         visible={modalVisible}
    //         contentText={modalText}
    //         textActionOne={'Close'}
    //         onPressActionOne={modalAction}
    //         onDismiss={modalAction}
    //       />
    //     </InputContainer>
    //   </View>
    // );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: Colors.lightgray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
};

export default PinScreen;
