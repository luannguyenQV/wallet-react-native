/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Output, Text } from '../common';
import { performDivisibility, standardizeString } from '../../util/general';
import moment from 'moment';

class CardReward extends Component {
  render() {
    const { campaign, amount, currency, created, status } = this.props.item;
    const color =
      status === 'accept' ? 'positive' : status === 'reject' ? 'negative' : '';

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
              <Text style={{ margin: 0, padding: 0 }}>
                {moment(created).format('lll')}
              </Text>
            </View>
            <View>
              <Text color={color} style={{ margin: 0, padding: 0 }}>
                {standardizeString(status)}
              </Text>
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
              <Text style={{ margin: 0, padding: 0 }}>
                {moment(created).format('lll')}
              </Text>
            </View>
            <View>
              <Text color={color} style={{ margin: 0, padding: 0 }}>
                {standardizeString(status)}
              </Text>
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

const styles = {
  viewStyleDetailCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    // borderRadius: 2,
    // borderColor: '#ffffff',
    // borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  viewStyleFooter: {
    // flex: 2,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
};

export { CardReward };
