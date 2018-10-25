import React from 'react';
import {
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { HeaderButton } from './HeaderButton';
import { Spinner } from './Spinner';
import context from './context';

const _PopUpGeneral = props => {
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
    colorTitleText,
    colors,
  } = props;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}
      transparent>
      <KeyboardAvoidingView
        keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
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
                {title || subtitle || iconTitleRight ? (
                  <View resizeMode="cover" style={[viewStyleTitleContainer]}>
                    <View style={viewStyleTitle}>
                      {title ? (
                        <Text
                          style={[
                            textStyleTitle,
                            {
                              color: colorTitleText
                                ? colorTitleText
                                : colors.font,
                            },
                          ]}>
                          {title}
                        </Text>
                      ) : null}
                      {subtitle ? (
                        <Text
                          style={[
                            textStyleSubtitle,
                            {
                              color: colorTitleText
                                ? colorTitleText
                                : colors.font,
                            },
                          ]}>
                          {subtitle}
                        </Text>
                      ) : null}
                    </View>
                    {iconTitleRight ? (
                      <View style={iconStyleTitleRight}>
                        <HeaderButton
                          icon={iconTitleRight}
                          onPress={onPressTitleRight}
                          color="lightgrey"
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}
                <View style={viewStyleContent}>
                  {contentText ? (
                    <Text style={[textStyleContent, { color: colors.font }]}>
                      {contentText}
                    </Text>
                  ) : null}
                  {children}
                  {errorText ? (
                    <Text style={[textStyleError, { color: colors.error }]}>
                      {errorText}
                    </Text>
                  ) : null}
                </View>

                {textActionOne || textActionTwo ? (
                  <View style={viewStyleFooter}>
                    {loading ? (
                      <Spinner
                        size="small"
                        containerStyle={{ width: '100%' }}
                      />
                    ) : (
                      <View style={viewStyleActionContainer}>
                        {textActionTwo ? (
                          <TouchableHighlight
                            onPress={onPressActionTwo}
                            underlayColor="lightgrey"
                            style={buttonStyleAction}>
                            <Text
                              style={[textStyleAction, { color: colors.font }]}>
                              {textActionTwo}
                            </Text>
                          </TouchableHighlight>
                        ) : null}
                        {textActionOne ? (
                          <TouchableHighlight
                            onPress={onPressActionOne}
                            underlayColor="lightgrey"
                            style={buttonStyleAction}>
                            <Text
                              style={[textStyleAction, { color: colors.font }]}>
                              {textActionOne}
                            </Text>
                          </TouchableHighlight>
                        ) : null}
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 6,
    overflow: 'hidden',
  },
  backgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  viewStyleContent: {
    padding: 8,
  },
  viewStyleTitleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  viewStyleTitle: {
    flexDirection: 'column',
    padding: 8,
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
  textStyleContent: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  textStyleError: {
    padding: 8,
    paddingBottom: 0,
    fontSize: 14,
    // color: Colors.error,
  },
  iconStyleTitleRight: {
    right: -8,
    top: -8,
    margin: 0,
    // height: 48,
    // width: 48,
    position: 'absolute',
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
    // height: 52,
    padding: 8,
  },
  textStyleAction: {
    // color: Colors.primary,
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

const PopUpGeneral = context(_PopUpGeneral);

export { PopUpGeneral };
