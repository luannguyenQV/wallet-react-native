import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from './../../config/colors';
import { Spinner } from './Spinner';

const AuthForm = props => {
  const {
    viewStyleContainer,
    viewStyleHeader,
    viewStyleContent,
    viewStyleFooter,
    iconStyleHeaderLeft,
    buttonStyleActionRight,
    textStyleActionRight,
  } = styles;

  const {
    iconHeaderLeft,
    onPressHeaderLeft,
    textHeaderRight,
    onPressHeaderRight,
    textFooterRight,
    onPressFooterRight,
    loading,
  } = props;

  return (
    <View style={viewStyleContainer}>
      <View style={viewStyleHeader}>
        {iconHeaderLeft ? (
          <Icon
            style={iconStyleHeaderLeft}
            name={iconHeaderLeft}
            size={32}
            // color="black"
            onPress={onPressHeaderLeft}
          />
        ) : null}
        {textHeaderRight ? (
          <TouchableOpacity
            onPress={onPressHeaderRight}
            style={buttonStyleActionRight}>
            <Text style={textStyleActionRight}>{textHeaderRight}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={viewStyleContent}>
        {loading ? <Spinner size="small" /> : props.children}
      </View>
      <View style={viewStyleFooter}>
        {textFooterRight ? (
          <TouchableOpacity
            onPress={onPressFooterRight}
            style={buttonStyleActionRight}>
            <Text style={textStyleActionRight}>{textFooterRight}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  viewStyleHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 64,
    // paddingTop: 32,
    // padding: 12,
  },
  viewStyleContent: {
    flex: 1,
    padding: 24,
    // backgroundColor: Colors.onPrimary,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewStyleFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 64,
    padding: 16,
  },
  iconStyleHeaderLeft: {
    margin: 16,
    alignSelf: 'flex-start',
    color: Colors.onPrimary,
    // opacity: 0.87,
  },
  textStyleActionRight: {
    color: Colors.onPrimary,
    fontSize: 18,
    padding: 8,
    // alignSelf: 'flex-end',
  },
  buttonStyleActionRight: {
    // padding: 8,
    // alignSelf: 'flex-end',
  },
};

export { AuthForm };
