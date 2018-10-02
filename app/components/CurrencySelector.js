import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList } from 'react-native';
import { Toast } from 'native-base';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import context from './common/context';
import { performDivisibility } from '../util/general';
import { ListItem, ListSeparator } from './common';
import Picker from 'react-native-picker-select';

class _CurrencySelector extends Component {
  componentDidMount() {
    console.log('_picker', this._picker);
    const picker = this.picker;
    this._picker.setInputRef(picker);
    console.log('picker', this.picker);
    // console.log('picker', this.picker);
  }
  renderOutput() {
    const { currency, currencies, updateCurrency } = this.props;
    console.log(currency);

    const {
      viewStyleContent,
      _textStyleCode,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    const text = currency ? currency.currency.code : '';

    const items = currencies.data.map(item => {
      return {
        label:
          item.currency.code +
          ': ' +
          item.currency.symbol +
          performDivisibility(
            item.available_balance,
            item.currency.divisibility,
          ).toFixed(item.currency.divisibility),
        value: item.currency.code,
      };
    });
    console.log(text.length);
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
                  fontSize:
                    text.length <= 3
                      ? 24
                      : text.length == 4 ? 17 : text.length == 5 ? 18 : 17,
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

        <Picker
          value={currency}
          placeholder={{}}
          items={items}
          onValueChange={value => this._updateCurrency(value)}
          style={{ ...styles }}
          hideIcon
          ref={p => (this._picker = p)}
        />
      </View>
    );
  }

  _updateCurrency(currency) {
    let { currencies } = this.props;
    currencies = currencies.data.filter(
      item => item.currency.code === currency,
    );
    console.log(currency, currencies);
    this.props.updateCurrency(currencies[0]);
  }

  render() {
    const { colors, currencies, currency } = this.props;

    const { viewStyleContainer } = styles;
    const focused = true;

    return (
      <View style={{ flexDirection: 'column' }}>
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
            onPress={() => this._picker.togglePicker()}>
            {this.renderOutput()}
          </TouchableHighlight>
        </View>
        {/* {focused ? (
          <FlatList
            // refreshControl={
            //   <RefreshControl
            //     refreshing={loadingData}
            //     onRefresh={() => fetchData(type)}
            //   />string.indexOf(substring) !== -1
            // }
            keyboardShouldPersistTaps="handled"
            style={{
              backgroundColor: colors.primaryContrast,
              maxHeight: 150,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              overflow: 'hidden',
            }}
            contentContainerStyle={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              // overflow: 'hidden',
            }}
            // data={data.filter(item => item[title] === value)}
            data={currencies}
            renderItem={({ item }) => (
              <ListItem
                noImage
                // onPress={() => onPressListItem(item)}
                title={'sup'} //item.currency.code}
                subtitle={
                  'hello'
                  //
                }
                // image={item.image ? item.image : null}
              />
            )}
            // keyExtractor={item => item.currency.code.toString()}
            ItemSeparatorComponent={ListSeparator}
            // ListEmptyComponent={<ListItem title="No data" />}
          />
        ) : null} */}
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
    height: 58,
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
  inputIOS: {
    fontSize: 16,
    width: 0,
    // padding: 8,
    // backgroundColor: 'white',
    color: 'black',
  },
};

const CurrencySelector = context(_CurrencySelector);

export { CurrencySelector };
