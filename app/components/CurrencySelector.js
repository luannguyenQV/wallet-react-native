import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Clipboard } from 'react-native';
import { Toast } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import context from './common/context';

class _CurrencySelector extends Component {
  renderOutput() {
    const { currency } = this.props;
    console.log(currency);

    const {
      viewStyleContent,
      _textStyleCode,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    const text = currency.currency.code;

    return (
      <View style={viewStyleContent}>
        <View style={{ flex: 1 }}>
          {/* {currency.account ? (
            <View style={viewStyleLabel}>
              <Text style={[textStyleLabel]}>{label}</Text>
            </View>
          ) : null} */}
          <View style={viewStyleValue}>
            <Text
              style={[
                _textStyleCode,
                {
                  fontSize: text.length <= 3 ? 24 : text.length <= 5 ? 22 : 18,
                },
              ]}>
              {text}
            </Text>
          </View>
        </View>
        <Icon name="chevron-down" size={20} color={'black'} />
      </View>
    );
  }

  render() {
    const { colors } = this.props;

    const { viewStyleContainer } = styles;
    const focused = false;

    return (
      <View
        style={[
          viewStyleContainer,
          {
            backgroundColor: colors.primaryContrast,
            borderColor: focused ? colors.focus : 'lightgrey',
          },
        ]}>
        <TouchableHighlight
          underlayColor={'white'}
          activeOpacity={0.2}
          onPress={() => console.log('pressed')}>
          {this.renderOutput()}
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    // flexWrap: 'wrap',
    margin: 8,
    width: 100,
    height: 60,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    overflow: 'hidden',
    padding: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
  viewStyleContent: {
    flexDirection: 'row',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleValue: {
    flexDirection: 'row',
    // paddingRight: 8,
    marginHorizontal: 8,
  },
  textStyleLabel: {
    fontSize: 12,
    color: 'black',
    opacity: 0.6,
  },
  _textStyleCode: {
    paddingLeft: 0,
    paddingTop: 2,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
};

const CurrencySelector = context(_CurrencySelector);

export { CurrencySelector };
