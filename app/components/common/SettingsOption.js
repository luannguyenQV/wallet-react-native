import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import context from './context';

class _SettingsOption extends Component {
  render() {
    const { gotoAddress, label, value, onPress, colors } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    return (
      <TouchableHighlight
        underlayColor="lightgrey"
        style={viewStyleContainer}
        // activeOpacity={0.2}
        onPress={() => (gotoAddress ? onPress(gotoAddress, label) : onPress())}>
        <View>
          <View style={viewStyleLabel}>
            <Text style={[textStyleLabel, { color: colors.font }]}>
              {label}
            </Text>
          </View>
          {value ? (
            <View style={viewStyleValue}>
              <Text style={[textStyleValue, { color: colors.font }]}>
                {value}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 8,
    borderRadius: 3,
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleValue: {
    flexDirection: 'row',
  },
  textStyleLabel: {
    fontWeight: 'normal',
    flex: 1,
    fontSize: 16,
    paddingBottom: 4,
  },
  textStyleValue: {
    fontSize: 14,
    color: 'black',
    opacity: 0.8,
  },
};

const SettingsOption = context(_SettingsOption);

export { SettingsOption };
