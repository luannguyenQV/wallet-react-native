import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Colors from './../config/colors';
import ResetNavigation from './../util/resetNavigation';

class DrawerHeader extends Component {
  render() {
    const { profile } = this.props;
    const {
      viewStyleContainer,
      imageStylePhoto,
      viewStyleName,
      textStyleName,
      textStyleEmail,
    } = styles;
    return (
      <TouchableHighlight
        onPress={() =>
          ResetNavigation.dispatchUnderDrawer(
            this.props.navigation,
            'Settings',
            'SettingsPersonalDetails',
          )
        }>
        <View style={viewStyleContainer}>
          <Image
            style={imageStylePhoto}
            source={
              profile.profile
                ? {
                    uri: profile.profile,
                    // cache: 'only-if-cached',
                  }
                : require('./../../assets/icons/profile.png')
            }
          />
          <View style={viewStyleName}>
            <Text style={textStyleName}>
              {profile.first_name
                ? profile.first_name + ' ' + profile.last_name
                : profile.username}
            </Text>
            <Text style={textStyleEmail}>{profile.email || ''}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  viewStyleContainer: {
    backgroundColor: Colors.primary,
    // height: 240,
    paddingTop: 48,
    padding: 16,
  },
  imageStylePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.secondary,
    borderWidth: 5,
  },
  viewStyleName: {
    paddingVertical: 12,
  },
  textStyleName: {
    color: Colors.onPrimary,
    fontSize: 14,
    paddingBottom: 4,
    fontWeight: 'bold',
  },
  textStyleEmail: {
    color: Colors.onPrimary,
    fontSize: 14,
  },
};

const mapStateToProps = ({ user }) => {
  const { profile } = user;
  return { profile };
};

export default connect(mapStateToProps, {})(DrawerHeader);
