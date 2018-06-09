import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';

import Colors from './../../config/colors';
import { Spinner } from './Spinner';
import { HeaderButton } from './HeaderButton';
import TouchableCircle from './../touchableCircle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-swipeable';

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
    textStyleError,
    iconStyleTitleRight,
    viewStyleFooter,
    viewStyleContent,
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
    onPressContent,
    onPressTitle,
    iconFooter,
    onPressFooter,
    titleStyle,
    errorText,
    backgroundColor,
    swipeableContent,
    disableActionOne,
    disableActionTwo,
  } = props;

  // console.log(props);

  return (
    <View style={viewStyleCardContainer}>
      {/* <Swipeable rightContent={swipeableContent}> */}
      <View>{renderHeader ? renderHeader : null}</View>
      {title || subtitle || iconTitleLeft || iconTitleRight ? (
        <View
          resizeMode="cover"
          style={[
            viewStyleTitleContainer,
            {
              backgroundColor: titleStyle ? Colors[titleStyle] : Colors.primary,
              height: itemCode ? 72 : 64,
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
      <TouchableWithoutFeedback onPress={onPressContent}>
        <View
          style={[
            viewStyleContent,
            {
              backgroundColor: backgroundColor
                ? Colors[backgroundColor]
                : 'white',
            },
          ]}>
          {props.children}
          {errorText ? <Text style={textStyleError}>{errorText}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
      {textActionOne || textActionTwo || iconFooter ? (
        <View style={viewStyleFooter}>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <View style={viewStyleActionContainer}>
              {iconFooter ? (
                <Icon
                  style={{
                    position: 'absolute',
                    left: 8,
                    bottom: 8,
                    margin: 0,
                    padding: 8,
                  }}
                  name={iconFooter}
                  size={22}
                  onPress={onPressFooter}
                  color={Colors.secondary}
                />
              ) : null}
              {textActionTwo ? (
                <TouchableHighlight
                  disabled={disableActionTwo}
                  underlayColor={Colors.lightGray}
                  style={buttonStyleAction}
                  onPress={onPressActionTwo}>
                  <Text style={textStyleAction}>{textActionTwo}</Text>
                </TouchableHighlight>
              ) : null}
              {textActionOne ? (
                <TouchableHighlight
                  disabled={disableActionOne}
                  underlayColor={Colors.lightGray}
                  style={buttonStyleAction}
                  onPress={onPressActionOne}>
                  <Text style={textStyleAction}>{textActionOne}</Text>
                </TouchableHighlight>
              ) : null}
            </View>
          )}
        </View>
      ) : null}
      {/* </Swipeable> */}
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
    margin: 8,
    // marginVertical: 8,
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
    // height: 72,
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
  viewStyleContent: {
    // paddingTop: 8,
    // paddingHorizontal: 8,
  },
  textStyleSubtitle: {
    fontSize: 12,
    color: Colors.onSecondary,
  },
  textStyleError: {
    paddingTop: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.error,
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
  viewStyleFooter: {
    flexDirection: 'row',
    // height: 52,
    width: '100%',
    alignItems: 'center',
  },
  viewStyleActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 52,
    padding: 8,
  },
  textStyleAction: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    // padding: 8,
  },
  buttonStyleAction: {
    padding: 8,
    marginLeft: 8,
    // marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
};

export { Card };
