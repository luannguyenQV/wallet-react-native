// import lib for making component
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from './../../config/colors';
import { Spinner } from './Spinner';
import TouchableCircle from './../touchableCircle';

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
    iconStyleHeaderRight,
    viewStyleFooter,
  } = styles;

  const {
    textHeader,
    iconHeaderLeft,
    onPressHeaderLeft,
    iconHeaderRight,
    walletCodeHeaderRight,
    walletCodeActive,
    onPressHeaderRight,
    textActionOne,
    onPressActionOne,
    textActionTwo,
    onPressActionTwo,
    loading,
    onCardPress,
  } = props;

  return (
    <View style={viewStyleCardContainer}>
      {textHeader || iconHeaderLeft || iconHeaderRight ? (
        <View resizeMode="cover" style={viewStyleCardTitleContainer}>
          {iconHeaderLeft ? (
            <Icon
              style={iconStyleHeaderLeft}
              name={iconHeaderLeft}
              size={32}
              // color="black"
              onPress={onPressHeaderLeft}
            />
          ) : null}
          <Text style={textStyleCardTitle}>{textHeader}</Text>
          {iconHeaderLeft ? (
            <Icon
              style={iconStyleHeaderRight}
              name={iconHeaderRight}
              size={32}
              // color="black"
              onPress={onPressHeaderRight}
            />
          ) : null}
          {walletCodeHeaderRight ? (
            <TouchableCircle
              text={walletCodeHeaderRight}
              active={walletCodeActive}
              onPress={onPressHeaderRight}
              radius={27}
            />
          ) : null}
        </View>
      ) : null}
      <TouchableWithoutFeedback onPress={onCardPress}>
        <View>{props.children}</View>
      </TouchableWithoutFeedback>
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
    margin: 8,
    // marginBottom: 10,
    // padding: 5,
    // paddingBottom: 10,
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
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 16,
    paddingLeft: 16,
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
  iconStyleHeaderLeft: {
    padding: 16,
    alignSelf: 'flex-end',
    color: 'black',
    opacity: 0.87,
  },
  buttonStyleAction: {
    padding: 10,
  },
};

// make component available to other parts of app
export { Card };
