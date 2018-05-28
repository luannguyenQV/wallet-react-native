import React from 'react';
import {
  Text,
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import { HeaderButton } from './HeaderButton';
import { Spinner } from './Spinner';
import Colors from './../../config/colors';

const PopUpGeneral = props => {
  const {
    backgroundStyle,
    containerStyle,
    viewStyleTitleContainer,
    viewStyleTitle,
    textStyleTitle,
    textStyleSubtitle,
    viewStyleActionContainer,
    buttonStyleAction,
    textStyleAction,
    iconStyleTitleRight,
    viewStyleFooter,
    viewStyleContent,
    textStyleContent,
    textStyleError,
  } = styles;

  const {
    title,
    subtitle,
    iconTitleRight,
    onPressTitleRight,
    textActionOne,
    onPressActionOne,
    textActionTwo,
    onPressActionTwo,
    loading,
    titleStyle,
    children,
    contentText,
    visible,
    onDismiss,
    errorText,
  } = props;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}
      transparent>
      <TouchableHighlight
        style={backgroundStyle}
        onPress={onDismiss}
        underlayColor={'transparent'}>
        <View style={containerStyle}>
          <TouchableWithoutFeedback
            // style={containerStyle}
            onPress={() => {}}
            underlayColor={'transparent'}>
            <View>
              {title || iconTitleRight ? (
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
              <View style={viewStyleContent}>
                {children}
                <Text style={textStyleContent}>{contentText}</Text>
                <Text style={textStyleError}>{errorText}</Text>
              </View>

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
          </TouchableWithoutFeedback>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flex: 1,
    // height: '100%',
    overflow: 'hidden',
  },
  backgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  viewStyleContent: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  viewStyleTitleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 64,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  viewStyleTitle: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    // flexGrow: 1,
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
  textStyleContent: {
    fontSize: 16,
  },
  viewStyleFooter: {
    height: 52,
    padding: 8,
  },
  viewStyleActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textStyleError: {
    paddingTop: 8,
    fontSize: 14,
    color: Colors.error,
  },
  textStyleAction: {
    color: Colors.primary,
    fontSize: 16,
    paddingLeft: 8,
    fontWeight: 'bold',
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

export { PopUpGeneral };
