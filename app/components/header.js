import React, { Component } from 'react';
import Expo from 'expo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NetInfo,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons';
import Colors from './../config/colors';
import DrawerButton from './drawerButton';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offline: false,
      online: false,
      firstTime: true,
    };
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        offline: !isConnected,
      });
    });

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange,
    );
  }

  handleFirstConnectivityChange = isConnected => {
    this.setState({
      offline: !isConnected,
    });
    if (!this.state.firstTime && isConnected) {
      this.setState({
        online: true,
      });
      setTimeout(() => {
        this.setState({
          online: false,
        });
      }, 5000);
    }

    this.setState({
      firstTime: false,
    });
  };

  render() {
    const {
      navigation,
      noAccounts,
      creditSwitch,
      debitSwitch,
      drawer,
      back,
      title,
      right,
      smallTitle,
      homeRight,
      headerRightTitle,
      headerRightOnPress,
      headerRightIcon,
    } = this.props;
    return (
      <View
        style={{
          paddingTop: Expo.Constants.statusBarHeight,
          backgroundColor: Colors.primary,
        }}>
        {noAccounts === true && (
          <View
            style={{
              paddingVertical: 4,
              paddingHorizontal: 20,
              backgroundColor: Colors.gold,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              No accounts added yet.
            </Text>
          </View>
        )}
        {creditSwitch === false &&
          debitSwitch === true && (
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 20,
                backgroundColor: Colors.red,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Deposits are temporarily disabled.
              </Text>
            </View>
          )}
        {debitSwitch === false &&
          creditSwitch === true && (
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 20,
                backgroundColor: Colors.red,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Withdrawals are temporarily disabled.
              </Text>
            </View>
          )}
        {debitSwitch === false &&
          creditSwitch === false && (
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 20,
                backgroundColor: Colors.red,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Transactions are temporarily disabled.
              </Text>
            </View>
          )}
        {this.state.offline && (
          <View
            style={{
              paddingVertical: 4,
              backgroundColor: Colors.red,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}>No internet Connection</Text>
          </View>
        )}
        {this.state.online && (
          <View
            style={{
              paddingVertical: 4,
              backgroundColor: Colors.green,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}>Connected</Text>
          </View>
        )}
        <View style={styles.options}>
          <View style={styles.left}>
            {drawer ? <DrawerButton navigation={navigation} /> : null}
            {back ? (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ padding: 20 }}>
                <Icon name="ios-arrow-back" size={35} color="white" />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.title}>
            {title ? (
              <Text
                style={[styles.titleText, { fontSize: smallTitle ? 16 : 20 }]}>
                {title}
              </Text>
            ) : null}
          </View>
          <View style={styles.rightIcon}>
            {right ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('QRcodeScanner')}
                style={{ padding: 10 }}>
                <Icon
                  name="ios-qr-scanner-outline"
                  size={30}
                  color="white"
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
            ) : null}
            {homeRight ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('AccountsB')}
                style={{
                  flex: 1,
                  padding: 10,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                }}>
                <Icon
                  name="ios-arrow-up-outline"
                  size={30}
                  color="white"
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
            ) : null}
            {headerRightTitle ? (
              <HeaderButtons color="white">
                <HeaderButtons.Item
                  title={headerRightTitle}
                  onPress={headerRightOnPress}
                  // buttonStyle={{ fontSize: 12 }}
                />
              </HeaderButtons>
            ) : null}
            {headerRightIcon ? (
              <HeaderButtons IconComponent={Icon} iconSize={23} color="white">
                <HeaderButtons.Item
                  iconName={headerRightIcon}
                  onPress={headerRightOnPress}
                />
              </HeaderButtons>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 64,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 0,
  },
});
