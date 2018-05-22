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

const Card = props => {
  const {
    viewStyleCardContainer,
    viewStyleTitleContainer,
    viewStyleTitle,
    textStyleTitle,
    textStyleSubtitle,
    viewStyleActionContainer,
    buttonStyleAction,
    textStyleAction,
    iconStyleTitleLeft,
    iconStyleTitleRight,
    viewStyleFooter,
  } = styles;

  const {
    title,
    subtitle,
    iconTitleLeft,
    onPressTitleLeft,
    textTitleLeft,
    iconTitleRight,
    itemCode,
    itemActive,
    onPressTitleRight,
    textActionOne,
    onPressActionOne,
    textActionTwo,
    onPressActionTwo,
    loading,
    onCardPress,
    onPressTitle,
    titleStyle,
  } = props;

  console.log(props);

  return (
    <View style={viewStyleCardContainer}>
      <View>
        {title || iconTitleLeft || iconTitleRight ? (
          <View
            resizeMode="cover"
            style={[
              viewStyleTitleContainer,
              {
                backgroundColor: titleStyle
                  ? Colors[titleStyle]
                  : Colors.primary,
              },
            ]}>
            {itemCode ? (
              <TouchableCircle
                text={itemCode}
                active={itemCodeActive}
                onPress={onPressTitleLeft}
                radius={24}
              />
            ) : null}
            {textTitleLeft ? (
              <TouchableCircle
                text={textTitleLeft}
                active={itemActive}
                onPress={onPressTitleLeft}
                radius={24}
              />
            ) : null}
            {iconTitleLeft ? (
              <Icon
                style={iconStyleTitleLeft}
                name={iconTitleLeft}
                size={32}
                // color="black"
                onPress={onPressTitleLeft}
              />
            ) : null}
            <TouchableWithoutFeedback onPress={onPressTitle}>
              <View style={viewStyleTitle}>
                <Text
                  style={[
                    textStyleTitle,
                    {
                      fontSize: title.length < 15 ? 24 : 18,
                      color: titleStyle
                        ? Colors[titleStyle + 'Contrast']
                        : Colors.primaryContrast,
                    },
                  ]}>
                  {title}
                </Text>
                <Text
                  style={[
                    textStyleSubtitle,
                    {
                      color: titleStyle
                        ? Colors[titleStyle + 'Contrast']
                        : Colors.primaryContrast,
                      opacity: 0.8,
                    },
                  ]}>
                  {subtitle}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {iconTitleRight ? (
              <Icon
                style={iconStyleTitleRight}
                name={iconTitleRight}
                size={24}
                // color="black"
                onPress={onPressTitleRight}
              />
            ) : null}
          </View>
        ) : null}
      </View>
      <TouchableWithoutFeedback onPress={onCardPress}>
        <View>{props.children}</View>
      </TouchableWithoutFeedback>
      {textActionOne || textActionTwo ? (
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
      ) : null}
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
  viewStyleTitleContainer: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 72,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  viewStyleTitle: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    // flex: 1,
    width: '100%',
  },
  textStyleTitle: {
    // fontSize: 24,
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
  iconStyleTitleLeft: {
    padding: 16,
    alignSelf: 'flex-start',
    color: 'black',
    opacity: 0.87,
  },
  iconStyleTitleRight: {
    padding: 16,
    // alignSelf: 'flex-end',
    right: 0,
    // bottom: 4,
    position: 'absolute',
    color: 'black',
    opacity: 0.87,
  },
  buttonStyleAction: {
    padding: 10,
  },
};

export { Card };
