import React from 'react';
import { View, Text } from 'react-native';
import Colors from './../../config/colors';

const EmptyListMessage = ({ text }) => {
  const { viewStyleContainer, viewStyleBox, textStyle } = styles;
  return (
    <View style={viewStyleContainer}>
      <View style={viewStyleBox}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyleContainer: {
    flex: 1,
    padding: 8,
  },
  viewStyleBox: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'normal',
  },
};

export { EmptyListMessage };
