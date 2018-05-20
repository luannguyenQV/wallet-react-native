import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Colors from './../../config/colors';

class SettingsOption extends Component {
  render() {
    const { goTo, gotoAddress, label, value } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    return (
      <View style={viewStyleContainer}>
        <TouchableHighlight
          underlayColor={'white'}
          activeOpacity={0.2}
          onPress={() => goTo(gotoAddress, label)}>
          <View>
            <View style={viewStyleLabel}>
              <Text style={[textStyleLabel]}>{label}</Text>
            </View>
            {value ? (
              <View style={viewStyleValue}>
                <Text style={textStyleValue}>{value}</Text>
              </View>
            ) : null}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    flexWrap: 'wrap',
    paddingBottom: 8,
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleValue: {
    flexDirection: 'row',
  },
  // touchable: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   height: 60,
  //   borderBottomWidth: 1,
  //   borderBottomColor: Colors.lightgray,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  textStyleLabel: {
    paddingTop: 16,
    // height: 28,
    paddingLeft: 0,
    color: 'black',
    fontWeight: 'normal',
    borderColor: 'white',
    borderWidth: 1,
    flex: 1,
    // alignItems: 'center',
    fontSize: 16,
    paddingBottom: 4,
  },
  textStyleValue: {
    fontSize: 14,
    color: 'black',
    opacity: 0.6,
    paddingBottom: 4,
    // paddingTop: 4,
  },
};

export { SettingsOption };
