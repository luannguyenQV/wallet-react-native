import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';
import { Text } from './Text';

const _Title = props => {
  const { viewStyleContainer, textStyleTitle, textStyleSubtitle } = styles;

  const { onPress, title, subtitle, colorTitleText, colors, design } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={viewStyleContainer}>
        <Text t="h5" style={textStyleTitle}>
          {title}
        </Text>
        {subtitle ? (
          <Text t="s2" o={0.8} style={textStyleSubtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

_Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
  textStyleTitle: PropTypes.object,
  textStyleSubtitle: PropTypes.object,
};

_Title.defaultProps = {
  title: '',
  subtitle: '',
  onPress: () => {},
  textStyleTitle: null,
  textStyleSubtitle: null,
};

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
