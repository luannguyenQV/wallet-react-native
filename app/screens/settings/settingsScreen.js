import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  changeTheme,
  showModal,
  hideModal,
  logoutUser,
} from './../../redux/actions';
import Header from './../../components/header';
import App from './../../../app.json';
import Picker from 'react-native-picker-select';

import {
  SettingsContainer,
  SettingsOption,
  InputContainer,
  Text,
  PopUpGeneral,
} from './../../components/common';
import { settingsSelector } from '../../redux/reducers/AuthReducer';
import { configCurrentThemeStateSelector } from '../../redux/reducers/ConfigReducer';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  goTo = (path, name) => {
    this.props.navigation.navigate(path, { name });
  };

  renderDocuments() {
    return (
      <View>
        <SettingsOption
          label="Proof of identity"
          gotoAddress="Document"
          onPress={this.goTo}
        />

        <SettingsOption
          label="Advanced proof of identity"
          gotoAddress="Document"
          onPress={this.goTo}
        />

        <SettingsOption
          label="Proof of address"
          gotoAddress="Document"
          onPress={this.goTo}
        />
      </View>
    );
  }

  renderBankAccounts() {
    return (
      <SettingsOption
        label="Bank accounts"
        gotoAddress="SettingsBankAccounts"
        onPress={this.goTo}
      />
    );
  }

  renderCards() {
    return (
      <SettingsOption
        label="Cards"
        gotoAddress="SettingsCards"
        onPress={this.goTo}
      />
    );
  }

  renderCryptoAccounts() {
    return (
      <SettingsOption
        label="Crypto accounts"
        gotoAddress="SettingsCryptoAddresses"
        onPress={this.goTo}
      />
    );
  }

  renderSecurity() {
    return (
      <View>
        <SettingsOption
          label="Change password"
          gotoAddress="ChangePassword"
          onPress={this.goTo}
        />
        <SettingsOption
          label="Two-factor authentication"
          gotoAddress="TwoFactor"
          onPress={this.goTo}
        />
        <SettingsOption
          label="Pin/fingerprint authentication"
          gotoAddress="Pin"
          onPress={this.goTo}
        />
        <SettingsOption
          label="Log out"
          onPress={() => this.props.showModal('logout', 0, 'logout')}
        />
      </View>
    );
  }

  renderAppearance() {
    let themes = [
      { label: 'Theme: Light (default)', value: 'light' },
      { label: 'Theme: Dark', value: 'dark' },
    ];
    return (
      <Picker
        value={this.props.theme}
        placeholder={{}}
        items={themes}
        onValueChange={value => {
          this.props.changeTheme(value);
        }}
        style={{
          inputIOS: {
            fontSize: 16,
            padding: 8,
            backgroundColor: 'white',
            color: '#707070',
          },
          inputAndroid: {
            // fontSize: 16,
            padding: 8,
            backgroundColor: 'white',
            color: '#707070',
          },
          underline: { borderTopWidth: 0 },
        }}
        hideIcon
        // underline={{
        //   borderTopWidth: 0,
        //   height: 0,
        // }}
        // ref={el => {
        //   this.inputRefs.picker = el;
        // }}
      />
    );
  }

  renderModal() {
    const { modalVisible, modalType, loggingOut } = this.props.settings;
    const modalOnDismiss = () => this.props.hideModal();
    const modalActionOne = {
      text: 'LOG OUT',
      onPress: () => {
        this.props.logoutUser();
        // this.props.navigation.navigate('AuthScreen');
      },
    };
    const modalActionTwo = {
      text: 'CANCEL',
      onPress: modalOnDismiss,
    };
    const contentText =
      'You are about to log out. You will need to provide your log in credentials when you open the app again.';
    const titleText = 'Log out?';
    return (
      <PopUpGeneral
        visible={modalVisible && modalType === 'logout'}
        textActionOne={modalActionOne.text}
        onPressActionOne={modalActionOne.onPress}
        textActionTwo={modalActionTwo.text}
        onPressActionTwo={modalActionTwo.onPress}
        onDismiss={modalOnDismiss}
        loading={loggingOut}
        errorText={''}
        title={titleText}
        contentText={contentText}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Settings" />
        <InputContainer>
          <SettingsContainer label="External accounts">
            {this.renderBankAccounts()}
            {/* {this.renderCards()} */}
            {/* {this.renderCryptoAccounts()} */}
          </SettingsContainer>
          <SettingsContainer label="Appearance">
            {this.renderAppearance()}
          </SettingsContainer>
          <SettingsContainer label="Security">
            {this.renderSecurity()}
          </SettingsContainer>
        </InputContainer>
        {this.renderModal()}
        <Text>
          {'Version: ' +
            App.expo.version +
            (App.expo.slug === 'rehive-wallet-staging' ? ' (staging)' : '')}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};

const mapStateToProps = state => {
  return {
    theme: configCurrentThemeStateSelector(state),
    settings: settingsSelector(state),
  };
};

export default connect(mapStateToProps, {
  changeTheme,
  showModal,
  hideModal,
  logoutUser,
})(SettingsScreen);
