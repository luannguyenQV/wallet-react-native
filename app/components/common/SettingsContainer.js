import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingsContainer extends Component {
  render() {
    const { label, children } = this.props;

    const {
      viewStyleContainer,
      viewStyleChildren,
      viewStyleLabel,
      textStyleLabel,
    } = styles;

    return (
      <View style={viewStyleContainer}>
        <View style={viewStyleLabel}>
          <Text style={textStyleLabel}>{label}</Text>
        </View>
        {/* {children} */}
        <View style={viewStyleChildren}>{children}</View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleChildren: {
    flexDirection: 'column',
  },
  textStyleLabel: {
    fontSize: 14,
    paddingTop: 8,
    color: 'black',
    opacity: 0.86,
  },
};

export { SettingsContainer };
