// import lib for making component
import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import Colors from './../../config/colors';

// make component
const Button = ({ onPress, label }) => {
  // const  = this.props;
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableHighlight onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{label}</Text>
    </TouchableHighlight>
  );
};

const styles = {
  buttonStyle: {
    marginTop: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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
