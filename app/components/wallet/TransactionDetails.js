import React from 'react';
import { Text, View } from 'react-native';
import Colors from './../../config/colors';
import moment from 'moment';

const TransactionDetails = props => {
  const {
    textStyle1,
    textStyle1Left,
    textStyle1Right,
    textStyle1Right2,
    textStyle2Left,
    textStyle2Right,
    textStyle2Right2,
    viewStyle1,
    viewStyle2,
    viewStyle3,
    viewStyle4,
    borderLine,
    borderLine2,
  } = styles;

  const {
    label,
    amount,
    total_amount,
    currency,
    fee,
    balance,
    created,
    status,
  } = props.transactionDetails;

  getAmount = (amount = 0, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      amount = amount / 10;
    }

    return amount.toFixed(8).replace(/\.?0+$/, '');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4, padding: 5 }}>
        <View style={{ flex: 4, padding: 20 }}>
          {/* <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 18,
                color: Colors.black,
              }}>
              {' '}
              Transaction details
            </Text>
          </View> */}

          <View style={{ flex: 1 }}>
            <View style={viewStyle1}>
              <Text style={textStyle1Left}>{'Type:'}</Text>
              <Text style={textStyle1Right}>{label}</Text>
            </View>
            <View style={viewStyle2}>
              <Text style={textStyle1Left}>{'Total amount:'}</Text>
              <View style={viewStyle4}>
                <Text>{total_amount < 0 ? '-' : ''}</Text>
                <Text style={textStyle1}>
                  {currency.symbol +
                    Math.abs(
                      this.getAmount(total_amount, currency.divisibility),
                    )}
                </Text>
              </View>
            </View>
            <View style={borderLine} />
            <View style={viewStyle3}>
              <Text style={textStyle2Left}>{'Amount:'}</Text>
              <View style={viewStyle4}>
                <Text>{amount < 0 ? '-' : ''}</Text>
                <Text style={textStyle2Right2}>
                  {currency.symbol +
                    Math.abs(this.getAmount(amount, currency.divisibility))}
                </Text>
              </View>
            </View>
            <View style={viewStyle2}>
              <Text style={textStyle2Left}>{'Fees:'}</Text>
              <View style={viewStyle4}>
                <Text>{fee < 0 ? '-' : ''}</Text>
                <Text style={textStyle2Right2}>
                  {currency.symbol +
                    Math.abs(this.getAmount(fee, currency.divisibility))}
                </Text>
              </View>
            </View>
            <View style={borderLine} />
            <View style={viewStyle3}>
              <Text style={textStyle1Left}>{'Balance:'}</Text>
              <View style={viewStyle4}>
                <Text>{balance < 0 ? '-' : ''}</Text>
                <Text style={textStyle1Right2}>
                  {currency.symbol +
                    Math.abs(this.getAmount(balance, currency.divisibility))}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={borderLine2}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 15,
              alignSelf: 'flex-start',
              color: Colors.black,
            }}>
            {moment(created).format('lll')}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 15,
              alignSelf: 'flex-end',
              color: Colors.black,
            }}>
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  textStyle1: {
    fontSize: 19,
    color: Colors.black,
  },
  textStyle1Left: {
    flex: 4,
    fontSize: 19,
    color: Colors.black,
    textAlign: 'right',
  },
  textStyle1Right: {
    flex: 4,
    fontSize: 19,
    color: Colors.black,
    paddingLeft: 12,
  },
  textStyle1Right2: {
    flex: 4,
    fontSize: 19,
    color: Colors.black,
  },
  textStyle2Left: {
    flex: 4,
    fontSize: 17,
    color: Colors.black,
    textAlign: 'right',
  },
  textStyle2Right: {
    flex: 4,
    fontSize: 17,
    color: Colors.black,
    paddingLeft: 12,
  },
  textStyle2Right2: {
    flex: 4,
    fontSize: 17,
    color: Colors.black,
  },
  viewStyle1: {
    flexDirection: 'row',
    paddingTop: 19,
  },
  viewStyle2: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  viewStyle3: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  viewStyle4: {
    flex: 4,
    flexDirection: 'row',
    paddingLeft: 12,
    alignItems: 'center',
  },
  borderLine: {
    height: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
  },
  borderLine2: {
    height: 50,
    flexDirection: 'row',
    borderTopColor: Colors.lightgray,
    borderTopWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

export default TransactionDetails;
