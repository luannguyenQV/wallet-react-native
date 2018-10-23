import React, { Component } from 'react';
import { Constants } from 'expo';
import { View, Text, NetInfo } from 'react-native';
import { HeaderButton } from './common';
import context from './common/context';

class _Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offline: false,
      online: false,
      firstTime: true,
    };
  }

  componentDidMount() {
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
      headerRightText,
      headerRightOnPress,
      headerRightIcon,
      colors,
      noShadow,
    } = this.props;
    return (
      <View
        style={[
          {
            elevation: 2,
            zIndex: 2,
            paddingTop: Constants.statusBarHeight,
            backgroundColor: colors.header,
          },
          noShadow
            ? null
            : {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 2,
                shadowOpacity: 0.15,
              },
        ]}>
        {creditSwitch === false &&
          debitSwitch === true && (
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 20,
                backgroundColor: colors.red,
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
                backgroundColor: colors.red,
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
                backgroundColor: colors.red,
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
              backgroundColor: colors.red,
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
              backgroundColor: colors.green,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}>Connected</Text>
          </View>
        )}
        <View style={styles.options}>
          <View style={styles.left}>
            {/* {drawer ? (
              <HeaderButton
                onPress={() => this.props.navigation.openDrawer()}
                icon="menu"
              />
            ) : null} */}
            {back ? (
              <HeaderButton
                onPress={() => navigation.goBack()}
                style={{ padding: 20 }}
                icon="arrow-back"
              />
            ) : null}
          </View>
          <View style={styles.title}>
            {title ? (
              <Text
                style={[
                  styles.titleText,
                  {
                    fontSize: smallTitle ? 16 : 20,
                    color: colors.headerContrast,
                  },
                ]}>
                {title}
              </Text>
            ) : null}
          </View>
          <View style={styles.rightIcon}>
            {right ? (
              <HeaderButton
                onPress={() => navigation.navigate('QRCodeScanner')}
                icon="camera"
              />
            ) : null}
            {headerRightText || headerRightIcon ? (
              <HeaderButton
                text={headerRightText}
                onPress={headerRightOnPress}
                icon={headerRightIcon}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  options: {
    width: '100%',
    flexDirection: 'row',
    height: 64,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    paddingLeft: 0,
  },
};

const Header = context(_Header);

export default Header;
