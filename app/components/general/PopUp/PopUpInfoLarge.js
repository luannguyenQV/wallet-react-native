import React from 'react';
import { Text, View } from 'react-native';
import Colors from './../../../config/colors';

const PopUpInfoLarge = props => {
  const {
    textStyleLabel,
    textStyleSign,
    textStyleValue,
    viewStyleRow,
    viewStyleValue,
  } = styles;

  const { label, sign, value } = props;

  return (
    <View style={viewStyleRow}>
      <Text style={textStyleLabel}>{label}</Text>
      <View style={viewStyleValue}>
        <Text style={textStyleSign}>{sign}</Text>
        <Text style={textStyleValue}>{value}</Text>
      </View>
    </View>
  );
};

const styles = {
  textStyleLabel: {
    flex: 4,
    fontSize: 19,
    color: Colors.black,
    textAlign: 'right',
  },
  textStyleSign: {
    color: Colors.black,
  },
  textStyleValue: {
    flex: 4,
    fontSize: 19,
    color: Colors.black,
  },
  viewStyleRow: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  viewStyleValue: {
    flex: 4,
    flexDirection: 'row',
    paddingLeft: 12,
    alignItems: 'center',
  },
};

export default PopUpInfoLarge;
