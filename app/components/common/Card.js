import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Colors from './../../config/colors';
import { Spinner } from './Spinner';
import { HeaderButton } from './HeaderButton';
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
    headerStyle,
  } = styles;

  const {
    renderHeader,
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

  // console.log(props);

  return (
    <View style={viewStyleCardContainer}>
      <View>{renderHeader ? renderHeader : null}</View>
      {title || iconTitleLeft || iconTitleRight ? (
        <View
          resizeMode="cover"
          style={[
            viewStyleTitleContainer,
            {
              backgroundColor: titleStyle ? Colors[titleStyle] : Colors.primary,
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
            <HeaderButton
              name={iconTitleLeft}
              onPress={onPressTitleLeft}
              color={
                titleStyle
                  ? Colors[titleStyle + 'Contrast']
                  : Colors.primaryContrast
              }
            />
          ) : null}
          <TouchableWithoutFeedback onPress={onPressTitle}>
            <View style={viewStyleTitle}>
              <Text
                style={[
                  textStyleTitle,
                  {
                    fontSize: title ? (title.length < 15 ? 24 : 18) : 24,
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
            <View style={iconStyleTitleRight}>
              <HeaderButton
                icon={iconTitleRight}
                onPress={onPressTitleRight}
                color={
                  titleStyle
                    ? Colors[titleStyle + 'Contrast']
                    : Colors.primaryContrast
                }
              />
            </View>
          ) : null}
        </View>
      ) : null}
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 72,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  viewStyleTitle: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    flexGrow: 1,
    flex: 1,
    width: 0,
  },
  textStyleTitle: {
    color: Colors.onPrimary,
    flexShrink: 1,
    flexWrap: 'wrap',
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
    right: 0,
    margin: 0,
    height: 64,
    width: 64,
    position: 'absolute',
  },
  buttonStyleAction: {
    padding: 10,
  },
};

export { Card };
