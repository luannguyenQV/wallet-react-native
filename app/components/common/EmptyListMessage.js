import React from 'react';
import { View, Text } from 'react-native';
import context from './context';

const _EmptyListMessage = ({ text, colors }) => {
  const { viewStyleContainer, viewStyleBox, textStyle } = styles;
  return (
    <View style={viewStyleContainer}>
      <View style={viewStyleBox}>
        <Text style={[textStyle, { color: colors.font }]}>{text}</Text>
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

const EmptyListMessage = context(_EmptyListMessage);

export { EmptyListMessage };
