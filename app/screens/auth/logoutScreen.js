import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { logoutUser } from './../../redux/actions';

import Header from './../../components/header';

class LogoutScreen extends Component {
  state = { loggingOut: false };

  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          colors={this.props.company_config.colors}
          title="Log out"
        />
        <View style={styles.container}>
          <Text style={{ fontSize: 30 }}>Logging Out</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const mapStateToProps = ({ auth }) => {
  const { company_config } = auth;
  return { company_config };
};

export default connect(mapStateToProps, { logoutUser })(LogoutScreen);
