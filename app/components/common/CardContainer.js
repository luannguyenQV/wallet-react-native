// import lib for making component
import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { View } from 'react-native';

// make component
const CardContainer = props => {
  return (
    <KeyboardAvoidingView
      style={styles.containerStyle}
      behavior={'padding'}
      keyboardVerticalOffset={15}
      enabled>
      <ScrollView
        // style={containerStyle}
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps="always">
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    // alignItems: 'stretch',
    padding: 5,
    marginTop: 0,
  },
};

// make component available to other parts of app
export { CardContainer };
