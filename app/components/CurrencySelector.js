import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import { Toast } from 'native-base';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import context from './common/context';
import { performDivisibility } from '../util/general';
import { ListItem, ListSeparator } from './common';
import Picker from 'react-native-picker-select';

class _CurrencySelector extends Component {
  renderOutput() {
    const { currency, currencies } = this.props;

    const {
      viewStyleContent,
      _textStyleCode,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    const text = currency && currency.currency ? currency.currency.code : '';

    const items = currencies.data.map(item => {
      return {
        label:
          item.currency.code +
          (currencies.multipleAccounts
            ? ' (' + item.account_name + '): '
            : ': ') +
          item.currency.symbol +
          performDivisibility(
            item.available_balance,
            item.currency.divisibility,
          ).toFixed(item.currency.divisibility),
        value: item.currency.code,
      };
    });

    return (
      <Picker
        value={text}
        placeholder={{}}
        items={items}
        onValueChange={value => this._updateCurrency(value)}
        // style={pickerStyle}
        hideIcon
        ref={p => (this._picker = p)}
        // mode={'dropdown'}
        // animate
      >
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
                    fontSize:
                      text.length <= 3
                        ? 20
                        : text.length == 4
                          ? 16
                          : text.length == 5 ? 18 : text.length == 6 ? 17 : 16,
                  },
                ]}>
                {text}
              </Text>
            </View>
          </View>
          <Icon
            name="chevron-down"
            size={20}
            color={'black'}
            style={{ opacity: 0.8, paddingTop: 4 }}
          />
        </View>
      </Picker>
    );
  }

  _updateCurrency(currency) {
    let { currencies } = this.props;
    currencies = currencies.data.filter(
      item => item.currency.code === currency,
    );
    this.props.updateCurrency(currencies[0]);
  }

  render() {
    const { colors } = this.props;

    const { viewStyleContainer } = styles;
    return (
      <View style={{ flexDirection: 'column' }}>
        <View
          style={[
            viewStyleContainer,
            {
              backgroundColor: colors.primaryContrast,
              borderColor:
                // this._picker && this._picker.state.showPicker
                //   ? colors.focus
                'lightgrey',
            },
          ]}>
          {this.renderOutput()}
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    margin: 8,
    width: 100,
    height: 61,
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
    marginHorizontal: 6,
  },
  textStyleLabel: {
    fontSize: 12,
    color: 'black',
  },
  _textStyleCode: {
    paddingLeft: 0,
    paddingTop: 2,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    opacity: 0.8,
    // marginRight: 8,
  },
};

const CurrencySelector = context(_CurrencySelector);

export { CurrencySelector };
