import React from 'react';
import { View } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

const popUp = props => {
  return (
    <PopupDialog
      ref={popupDialog => {
        this.popupDialog = popupDialog;
      }}>
      <View>{props.children};</View>
    </PopupDialog>
  );
};

export default popUp;
