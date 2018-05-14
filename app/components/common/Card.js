// import lib for making component
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from './../../config/colors';
import { Spinner } from './Spinner';

// make component
const Card = props => {
  const {
    viewStyleCardContainer,
    viewStyleCardTitleContainer,
    textStyleCardTitle,
    viewStyleActionContainer,
    buttonStyleAction,
    textStyleAction,
    iconStyleHeaderLeft,
    viewStyleFooter,
  } = styles;

  const {
    textHeader,
    iconHeaderLeft,
    onPressHeaderLeft,
    textActionOne,
    onPressActionOne,
    textActionTwo,
    onPressActionTwo,
    loading,
  } = props;

  return (
    <View style={viewStyleCardContainer}>
      {textHeader || iconHeaderLeft ? (
        <View resizeMode="cover" style={viewStyleCardTitleContainer}>
          <Icon
            style={iconStyleHeaderLeft}
            name={iconHeaderLeft}
            size={32}
            // color="black"
            onPress={onPressHeaderLeft}
          />
          <Text style={textStyleCardTitle}>{textHeader}</Text>
        </View>
      ) : null}
      <View>{props.children}</View>
      <View style={viewStyleFooter}>
        {loading ? (
          <Spinner size="small" />
        ) : (
          <View style={viewStyleActionContainer}>
            <TouchableOpacity
              onPress={onPressActionTwo}
              style={buttonStyleAction}>
              <Text style={textStyleAction}>{textActionTwo}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressActionOne}
              style={buttonStyleAction}>
              <Text style={textStyleAction}>{textActionOne}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
  {
    /* <View style={styles.containerStyle}>{props.children}</View>; */
  }
};

const styles = {
  viewStyleCardContainer: {
    // flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginVertical: 5,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  viewStyleCardTitleContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: 64,
  },
  textStyleCardTitle: {
    // position: 'absolute',
    // top: 120,
    // left: 26,
    backgroundColor: 'transparent',
    paddingTop: 16,
    fontSize: 24,
    color: 'black',
    opacity: 0.87,
    fontWeight: 'bold',
  },
  viewStyleFooter: {
    height: 52,
    padding: 8,
  },
  viewStyleActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textStyleAction: {
    color: Colors.primary,
    fontSize: 16,
    paddingLeft: 8,
  },
  iconStyleHeaderLeft: {
    padding: 16,
    alignSelf: 'flex-start',
    color: 'black',
    opacity: 0.87,
  },
  buttonStyleAction: {
    padding: 10,
  },
};

// make component available to other parts of app
export { Card };
