import React from 'react';
import { View as _View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

import { Spinner } from './Spinner';
import { HeaderButton } from './HeaderButton';
import TouchableCircle from './../touchableCircle';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { MaterialActions } from './MaterialActions';
import { Title } from './Title';
import { View } from './View';
import { Text } from './Text';

const _Card = props => {
  const {
    viewStyleCardContainer,
    viewStyleTitleContainer,
    textStyleError,
    iconStyleTitleLeft,
    iconStyleTitleRight,
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
    // errorText,
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

  const errorText =
    'DUMMY ERROR TEXT = isdjhgiadshgjkhsdoiuhgdhgishghisdjkhgishdighsdiughshighgiuhdsiuhgihgisdg';
  const actionOne = {
    text: textActionOne,
    onPress: onPressActionOne,
    disabled: disableActionOne,
  };
  const actionTwo = {
    text: textActionTwo,
    onPress: onPressActionTwo,
    disabled: disableActionTwo,
  };
  // const iconFooter = ;
  return (
    // <_View
    //   style={[
    //     viewStyleCardContainer,
    //     {
    //       shadowRadius: design.cardShadow,
    //       // borderColor: 'transparent',
    //       backgroundColor: 'transparent',
    //     },
    //   ]}>
    <_View
      style={[
        viewStyleCardContainer,
        {
          borderRadius: design.cardCornerRadius,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          shadowRadius: design.cardShadow,
          // borderColor: 'transparent',
          elevation: design.cardElevation,
        },
      ]}>
      {/* <Swipeable rightContent={swipeableContent}> */}
      {renderHeader ? <_View>{renderHeader}</_View> : null}
      {title || subtitle || iconTitleLeft || iconTitleRight ? (
        <_View
          resizeMode="cover"
          style={[viewStyleTitleContainer, { backgroundColor: 'white' }]}>
          {textTitleLeft ? (
            <_View style={iconStyleTitleLeft}>
              <TouchableCircle
                colors={colors}
                text={textTitleLeft}
                active={itemActive}
                onPress={onPressTitleLeft}
                radius={24}
              />
            </_View>
          ) : null}
          {iconTitleLeft ? (
            <HeaderButton
              name={iconTitleLeft}
              onPress={onPressTitleLeft}
              color={colorTitle ? colorTitle : colors.primaryContrast}
            />
          ) : null}
          <Title onPress={onPressTitle} title={title} subtitle={subtitle} />
          {iconTitleRight ? (
            <_View style={iconStyleTitleRight}>
              <HeaderButton
                icon={iconTitleRight}
                onPress={onPressTitleRight}
                color={colorTitle ? colorTitle : colors.font}
              />
            </_View>
          ) : null}
        </_View>
      ) : null}
      <TouchableWithoutFeedback onPress={onPressContent}>
        <View bC={'cardBackgroundColor'}>
          {canEdit ? (
            <_View
              style={{ position: 'absolute', right: 8, top: 8, padding: 8 }}>
              <Icon
                name={'edit'}
                size={22}
                color={colorIcon ? colorIcon : colors.grey2}
              />
            </_View>
          ) : null}
          {props.children}
          {/* {errorText ? <Text c={'error'}>{errorText}</Text> : null} TODO: not used anywhere yet, not showing */}
        </View>
      </TouchableWithoutFeedback>
      {textActionOne || textActionTwo || iconFooter ? (
        <MaterialActions
          actionOne={actionOne}
          actionTwo={actionTwo}
          loading={loading}
          iconFooter={{
            name: iconFooter,
            onPress: onPressFooter,
          }}
        />
      ) : null}
      {/* </Swipeable> */}
    </_View>
    // </_View>
  );
  {
    /* <_View style={styles.containerStyle}>{props.children}</_View>; */
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
    // padding: 8,
    alignItems: 'center',
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
  textStyleError: {
    paddingTop: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
};

const Card = context(_Card);

export { Card };
