// import lib for making component
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from './../../config/colors';

// make component
const Button = ({ onPress, label, reference, color }) => {
  // const  = this.props;
  const { buttonStyle, textStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress} style={buttonStyle} ref={reference}>
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowRadius: 5,
    paddingHorizontal: 50,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    flex: 1,
    marginTop: 10,
    height: 50,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    // minWidth: 200,
    marginHorizontal: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: 10,
    // paddingHorizontal: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
};

// make component available to other parts of app
export { Button };
