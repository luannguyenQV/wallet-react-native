import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

import { Spinner } from './Spinner';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const _MaterialActions = props => {
  const {
    viewStyleActionContainer,
    buttonStyleAction,
    textStyleAction,
    viewStyleFooter,
    iconStyleFooter,
  } = styles;

  const { actionOne, actionTwo, iconFooter, loading, colors, design } = props;
  return (
    <View style={[viewStyleFooter]}>
      {loading ? (
        <Spinner size="small" />
      ) : (
        <View style={viewStyleActionContainer}>
          {iconFooter.name ? (
            <Icon
              style={iconStyleFooter}
              name={iconFooter.name}
              size={22}
              onPress={iconFooter.onPress}
              color={colors.grey2}
            />
          ) : null}
          {actionTwo.text ? (
            <TouchableHighlight
              disabled={actionTwo.disabled}
              underlayColor="lightgrey"
              style={buttonStyleAction}
              onPress={actionTwo.onPress}>
              <Text style={[textStyleAction, { color: colors.font }]}>
                {actionTwo.text}
              </Text>
            </TouchableHighlight>
          ) : null}
          {actionOne.text ? (
            <TouchableHighlight
              disabled={actionOne.disabled}
              underlayColor="lightgrey"
              style={buttonStyleAction}
              onPress={actionOne.onPress}>
              <Text style={[textStyleAction, { color: colors.font }]}>
                {actionOne.text}
              </Text>
            </TouchableHighlight>
          ) : null}
        </View>
      )}
    </View>
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
    backgroundColor: 'white',
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

const MaterialActions = context(_MaterialActions);

export { MaterialActions };
