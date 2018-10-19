/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Output, Text } from '../common';
import { performDivisibility } from '../../util/general';
import moment from 'moment';

class CardReward extends Component {
  render() {
    const { campaign, amount, currency, created, status } = this.props.item;

    if (this.props.detail) {
      return (
        <View style={{ padding: 8 }}>
          <Output label="" value={campaign.description} />
          <Output
            label="Amount"
            value={
              currency.symbol +
              ' ' +
              performDivisibility(amount, currency.divisibility)
            }
          />
          <View style={styles.viewStyleFooter}>
            <View>
              <Text>{moment(created).format('lll')}</Text>
            </View>
            <View>
              <Text>{status}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ padding: 8 }}>
          <Output label="" value={campaign.description} />
          <Output
            label="Amount"
            value={
              currency.symbol +
              ' ' +
              performDivisibility(amount, currency.divisibility)
            }
          />
          <View style={styles.viewStyleFooter}>
            <View>
              <Text>{moment(created).format('lll')}</Text>
            </View>
            <View>
              <Text>{status}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

// _Button.propTypes = {
//   label: PropTypes.string, // Text displayed on button
//   reference: PropTypes.func, // For animations
//   animation: PropTypes.string, // Animation type
//   disabled: PropTypes.bool, // Disable touchable component
//   onPress: PropTypes.func, // Function to execute on press
//   icon: PropTypes.string, // Icon displayed on left of button
//   size: PropTypes.string, // Size of button (small / default or '' / large)
//   type: PropTypes.string, // Type of button (text, contained, TODO: outlined)
//   backgroundColor: PropTypes.string, // Button color
//   textColor: PropTypes.string, // Text color
//   round: PropTypes.bool, // Rounded corners
//   buttonStyle: PropTypes.object, // override button style
//   containerStyle: PropTypes.object, // override container style
//   textStyle: PropTypes.object, // override text style
//   color: PropTypes.string, // main color
//   colors: PropTypes.object, // colors from context
// };

// _Button.defaultProps = {
//   label: '',
//   reference: () => {},
//   animation: '',
//   disabled: false,
//   onPress: () => {},
//   icon: '',
//   size: '',
//   type: 'contained',
//   round: false,
//   buttonStyle: {},
//   containerStyle: {},
//   color: 'primary',
// };

// const styles = {
//   _containerStyle: {
//     flexDirection: 'row',
//     margin: 8,
//   },
//   _buttonStyle: {
//     flex: 1,
//     flexDirection: 'row',
//     borderRadius: 2.5,
//     minWidth: 64,
//     padding: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 2, height: 2 },
//     shadowRadius: 5,
//     shadowOpacity: 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   _textStyle: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// };

export { CardReward };
