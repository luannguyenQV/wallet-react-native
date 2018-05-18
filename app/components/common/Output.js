import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';

class Output extends Component {
  render() {
    const { label, value } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      textStyleLabel,
      viewStyleInput,
      textStyleInput,
    } = styles;

    return (
      <View style={viewStyleContainer}>
        <View style={viewStyleLabel}>
          <Text style={[textStyleLabel]}>{label}</Text>
        </View>
        <View style={viewStyleInput}>
          <Text style={textStyleInput}>{value}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    // marginLeft: 20,
    // marginRight: 20,
    // paddingTop: 15,
    borderBottomWidth: 0,
    flexWrap: 'wrap',
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleInput: {
    flexDirection: 'row',
  },
  textStyleLabel: {
    fontSize: 12,
    paddingTop: 8,
    color: 'black',
    opacity: 0.6,
  },
  textStyleInput: {
    height: 40,
    paddingLeft: 0,
    paddingBottom: 5,
    paddingTop: 5,
    color: 'black',
    fontWeight: 'normal',
    borderColor: 'white',
    borderWidth: 1,
    flex: 1,
    // alignItems: 'center',
    fontSize: 18,
  },
};

export { Output };
