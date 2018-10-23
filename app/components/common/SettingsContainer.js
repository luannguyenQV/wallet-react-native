import React, { Component } from 'react';
import { View, Text } from 'react-native';
import context from './context';

class _SettingsContainer extends Component {
  render() {
    const { label, children, colors } = this.props;

    const {
      viewStyleContainer,
      viewStyleChildren,
      viewStyleLabel,
      textStyleLabel,
    } = styles;

    return (
      <View style={viewStyleContainer}>
        <View style={viewStyleLabel}>
          <Text style={[textStyleLabel, { color: colors.font }]}>{label}</Text>
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
    padding: 8,
  },
  viewStyleLabel: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    marginBottom: 4,
    paddingBottom: 4,
    borderColor: 'lightgrey',
  },
  viewStyleChildren: {
    flexDirection: 'column',
  },
  textStyleLabel: {
    fontSize: 22,
    paddingTop: 8,
    paddingLeft: 8,
  },
};

const SettingsContainer = context(_SettingsContainer);

export { SettingsContainer };
