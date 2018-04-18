// import lib for making component
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Colors from './../../config/colors';

// make component
const Button = ({ onPress, label, reference }) => {
  // const  = this.props;
  const { buttonStyle, textStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TouchableHighlight onPress={onPress} style={buttonStyle} ref={reference}>
        <Text style={textStyle}>{label}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    alignItems: 'center',
    shadowRadius: 5,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    marginTop: 10,
    height: 50,
    width: 200,
    borderRadius: 2,
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
