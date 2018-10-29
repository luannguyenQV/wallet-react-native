import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

import { Spinner } from './Spinner';
import { HeaderButton } from './HeaderButton';
import TouchableCircle from './../touchableCircle';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const _Card = props => {
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
    iconStyleTitleLeft,
    iconStyleTitleRight,
    viewStyleFooter,
    viewStyleContent,
    iconStyleFooter,
  } = styles;

  const {
    renderHeader,
    title,
    subtitle,
    colorTitleBackground,
    colorTitleText,
    iconTitleLeft,
    onPressTitle,
    itemCode,
    itemActive,
    textTitleLeft,
    onPressTitleLeft,
    iconTitleRight,
    onPressTitleRight,
    backgroundColor,
    onPressContent,
    colorIcon,
    errorText,
    iconFooter,
    onPressFooter,
    textActionOne,
    onPressActionOne,
    disableActionOne,
    textActionTwo,
    onPressActionTwo,
    disableActionTwo,
    loading,
    swipeableContent,
    colors,
    canEdit,
    design,
  } = props;
  console.log(design);
  return (
    // <View
    //   style={[
    //     viewStyleCardContainer,
    //     {
    //       shadowRadius: design.cardShadow,
    //       borderColor: 'transparent',
    //       elevation: design.cardShadow,
    //     },
    //   ]}>
    <View
      style={[
        viewStyleCardContainer,
        {
          borderRadius: design.cardCornerRadius,
          overflow: 'hidden',
          backgroundColor: 'transparent',
        },
      ]}>
      {/* <Swipeable rightContent={swipeableContent}> */}
      {renderHeader ? <View>{renderHeader}</View> : null}
      {title || subtitle || iconTitleLeft || iconTitleRight ? (
        <View
          resizeMode="cover"
          style={[viewStyleTitleContainer, { backgroundColor: 'white' }]}>
          {textTitleLeft ? (
            <View style={iconStyleTitleLeft}>
              <TouchableCircle
                colors={colors}
                text={textTitleLeft}
                active={itemActive}
                onPress={onPressTitleLeft}
                radius={24}
              />
            </View>
          ) : null}
          {iconTitleLeft ? (
            <HeaderButton
              name={iconTitleLeft}
              onPress={onPressTitleLeft}
              color={colorTitle ? colorTitle : colors.primaryContrast}
            />
          ) : null}
          <TouchableWithoutFeedback onPress={onPressTitle}>
            <View style={viewStyleTitle}>
              <Text
                style={[
                  textStyleTitle,
                  {
                    color: colorTitleText ? colorTitleText : colors.font,
                  },
                ]}>
                {title}
              </Text>
              {subtitle ? (
                <Text
                  style={[
                    textStyleSubtitle,
                    { color: colorTitleText ? colorTitleText : colors.font },
                  ]}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
          {iconTitleRight ? (
            <View style={iconStyleTitleRight}>
              <HeaderButton
                icon={iconTitleRight}
                onPress={onPressTitleRight}
                color={colorTitle ? colorTitle : colors.font}
              />
            </View>
          ) : null}
        </View>
      ) : null}
      <TouchableWithoutFeedback onPress={onPressContent}>
        <View style={[viewStyleContent, { backgroundColor }]}>
          {canEdit ? (
            <View
              style={{ position: 'absolute', right: 8, top: 8, padding: 8 }}>
              <Icon
                name={'edit'}
                size={22}
                color={colorIcon ? colorIcon : colors.grey2}
              />
            </View>
          ) : null}
          {props.children}
          {errorText ? (
            <Text style={[textStyleError, { color: colors.error }]}>
              {errorText}
            </Text>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      {textActionOne || textActionTwo || iconFooter ? (
        <View style={[viewStyleFooter, { backgroundColor }]}>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <View style={viewStyleActionContainer}>
              {iconFooter ? (
                <Icon
                  style={iconStyleFooter}
                  name={iconFooter}
                  size={22}
                  onPress={onPressFooter}
                  color={colorIcon ? colorIcon : colors.grey2}
                />
              ) : null}
              {textActionTwo ? (
                <TouchableHighlight
                  disabled={disableActionTwo}
                  underlayColor="lightgrey"
                  style={buttonStyleAction}
                  onPress={onPressActionTwo}>
                  <Text style={[textStyleAction, { color: colors.font }]}>
                    {textActionTwo}
                  </Text>
                </TouchableHighlight>
              ) : null}
              {textActionOne ? (
                <TouchableHighlight
                  disabled={disableActionOne}
                  underlayColor="lightgrey"
                  style={buttonStyleAction}
                  onPress={onPressActionOne}>
                  <Text style={[textStyleAction, { color: colors.font }]}>
                    {textActionOne}
                  </Text>
                </TouchableHighlight>
              ) : null}
            </View>
          )}
        </View>
      ) : null}
      {/* </Swipeable> */}
    </View>
    // </View>
  );
  {
    /* <View style={styles.containerStyle}>{props.children}</View>; */
  }
};

_Card.defaultProps = {
  title: '',
  subtitle: '',
  renderHeader: null,
  animation: 'fadeInDownBig',
  disabled: false,
  onPress: () => {},
  icon: '',
  size: '',
  type: 'contained',
  colorTitleBackground: '',
  colorTitleText: '',
  backgroundColor: 'white',
};

_Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  renderHeader: PropTypes.object,
  animation: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

const styles = {
  viewStyleCardContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 2,
    },
    margin: 8,
  },
  viewStyleTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    // height: 72,
    padding: 8,
    alignItems: 'center',
  },
  viewStyleTitle: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingTop: 4,
    flexGrow: 1,
    flex: 1,
    width: 0,
  },
  textStyleTitle: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textStyleSubtitle: {
    opacity: 0.8,
    fontSize: 12,
  },
  viewStyleContent: {
    // paddingTop: 8,
    // paddingHorizontal: 8,
  },
  iconStyleTitleLeft: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  iconStyleTitleRight: {
    right: 0,
    height: 64,
    width: 64,
    position: 'absolute',
  },
  iconStyleFooter: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    padding: 8,
  },
  textStyleError: {
    paddingTop: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  viewStyleFooter: {
    flexDirection: 'row',
    height: 52,
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
    fontSize: 14,
    fontWeight: 'bold',
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

// const mapStateToProps = ({ user }) => {
//   const { company_config } = user;
//   return { company_config };
// };

// connect(mapStateToProps, {})(props => Card(props));

const Card = context(_Card);

export { Card };
