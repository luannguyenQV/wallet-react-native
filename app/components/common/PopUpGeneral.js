import React from 'react';
import { Text, Modal, View } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from '.';

const PopUpGeneral = ({ children, visible }) => {
  const { containerStyle, backgroundStyle } = styles;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {}}
      transparent>
      <View style={backgroundStyle}>
        <View style={containerStyle}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    padding: 20,
  },
  backgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export { PopUpGeneral };
