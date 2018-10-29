import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

const _Title = props => {
  const { viewStyleContainer, textStyleTitle, textStyleSubtitle } = styles;

  const { onPress, title, subtitle, colorTitleText, colors, design } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={viewStyleContainer}>
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
  );
};

// _MaterialActions.defaultProps = {
//   title: '',
//   subtitle: '',
//   renderHeader: null,
//   animation: 'fadeInDownBig',
//   disabled: false,
//   onPress: () => {},
//   icon: '',
//   size: '',
//   type: 'contained',
//   colorTitleBackground: '',
//   colorTitleText: '',
//   backgroundColor: 'white',
// };

// _MaterialActions.propTypes = {
//   title: PropTypes.string,
//   subtitle: PropTypes.string,
//   renderHeader: PropTypes.object,
//   animation: PropTypes.string,
//   disabled: PropTypes.bool,
//   onPress: PropTypes.func,
//   icon: PropTypes.string,
//   size: PropTypes.string,
//   type: PropTypes.string,
//   backgroundColor: PropTypes.string,
//   textColor: PropTypes.string,
// };

const styles = {
  viewStyleContainer: {
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
};

const Title = context(_Title);

export { Title };
