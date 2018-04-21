import React from 'react';
import { Text, View } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

const PopUp = props => {
  return (
    <PopupDialog
      ref={popupDialog => {
        this.popupDialog = popupDialog;
      }}>
      <View>
        <Text>Test</Text>
        {props.children}
      </View>
    </PopupDialog>
  );
};

export default PopUp;
