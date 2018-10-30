import React from 'react';
// import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import context from './context';

import { Spinner } from './Spinner';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Button } from './Button';
import { View } from './View';

const _MaterialActions = props => {
  const { iconStyleFooter } = styles;

  const { actionOne, actionTwo, iconFooter, loading, colors, design } = props;
  return (
    <View bC={'cardBackgroundColor'} h={52} w={'100%'} fD={'row'} aI={'center'}>
      {loading ? (
        <Spinner size="small" />
      ) : (
        <View fD={'row'} h={52} jC={'space-between'}>
          {iconFooter.name ? (
            <Icon
              style={iconStyleFooter}
              name={iconFooter.name}
              size={22}
              onPress={iconFooter.onPress}
              // color={colors.grey3}
              color={'green'}
            />
          ) : (
            <View />
          )}
          <View fD={'row'} h={52} jC={'flex-end'}>
            {actionTwo.text ? (
              <Button
                type="text"
                color="font"
                label={actionTwo.text}
                onPress={actionTwo.disabled ? () => {} : actionTwo.onPress}
              />
            ) : null}
            {actionOne.text ? (
              <Button
                type="text"
                color="font"
                label={actionOne.text}
                onPress={actionOne.disabled ? () => {} : actionOne.onPress}
              />
            ) : null}
          </View>
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
    // position: 'absolute',
    left: 8,
    // bottom: 8,
    // alignSelf: 'flex-start',
    padding: 8,
  },
  viewStyleFooter: {
    flexDirection: 'row',
    height: 52,
    width: '100%',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  viewStyleActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 52,
    padding: 8,
  },
};

const MaterialActions = context(_MaterialActions);

export { MaterialActions };
