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
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  viewStyleBox: {
    marginTop: 10,
    flexDirection: 'column',
    backgroundColor: Colors.lightgray,
    padding: 20,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: Colors.black,
  },
};

export { EmptyListMessage };
