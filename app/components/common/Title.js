import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';
import { Text } from './Text';
import { View } from './View';

const _Title = props => {
  const {
    onPress,
    title,
    subtitle,
    viewStyleContainer,
    textStyleTitle,
    textStyleSubtitle,
  } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View fD={'column'} p={0.25} f={1} style={viewStyleContainer}>
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
  viewStyleContainer: PropTypes.object,
};

_Title.defaultProps = {
  title: '',
  subtitle: '',
  onPress: () => {},
  textStyleTitle: null,
  textStyleSubtitle: null,
  viewStyleContainer: null,
};

const styles = {
  // viewStyleContainer: {
  //   flexDirection: 'column',
  //   paddingHorizontal: 8,
  //   paddingTop: 4,
  //   flexGrow: 1,
  //   flex: 1,
  //   width: 0,
  // },
};

const Title = context(_Title);

export { Title };
