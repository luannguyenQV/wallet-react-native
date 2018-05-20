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
    viewStyleHeaderContainer,
    viewStyleTitleContainer,
    textStyleTitle,
    textStyleSubtitle,
    viewStyleActionContainer,
    buttonStyleAction,
    textStyleAction,
    iconStyleHeaderLeft,
    iconStyleHeaderRight,
    viewStyleFooter,
  } = styles;

  const {
    title,
    subtitle,
    iconHeaderLeft,
    onPressHeaderLeft,
    iconHeaderRight,
    walletCode,
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
      {title || iconHeaderLeft || iconHeaderRight ? (
        <View resizeMode="cover" style={viewStyleHeaderContainer}>
          {walletCode ? (
            <TouchableCircle
              text={walletCode}
              active={walletCodeActive}
              onPress={onPressHeaderLeft}
              radius={24}
            />
          ) : null}
          {iconHeaderLeft ? (
            <Icon
              style={iconStyleHeaderLeft}
              name={iconHeaderLeft}
              size={32}
              // color="black"
              onPress={onPressHeaderLeft}
            />
          ) : null}
          <View style={viewStyleTitleContainer}>
            <Text style={textStyleTitle}>{title}</Text>
            <Text style={textStyleSubtitle}>{subtitle}</Text>
          </View>
          {iconHeaderLeft ? (
            <Icon
              style={iconStyleHeaderRight}
              name={iconHeaderRight}
              size={32}
              // color="black"
              onPress={onPressHeaderRight}
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
    borderRadius: 3,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 8,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  viewStyleHeaderContainer: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 72,
    alignItems: 'center',
  },
  viewStyleTitleContainer: {
    flexDirection: 'column',
  },
  textStyleTitle: {
    fontSize: 24,
    color: Colors.onPrimary,
    // color: 'black',
    opacity: 0.87,
    fontWeight: 'bold',
  },
  textStyleSubtitle: {
    fontSize: 12,
    color: Colors.onSecondary,
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
  iconStyleHeaderRight: {
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
