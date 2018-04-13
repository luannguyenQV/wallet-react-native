import React from 'react';
import { Text, View } from 'react-native';
import Colors from './../../config/colors';
import moment from 'moment';

import PopUpInfoLine from './../general/PopUp/PopUpInfoLine';
import PopUpInfoLarge from './../general/PopUp/PopUpInfoLarge';
import PopUpInfoSmall from './../general/PopUp/PopUpInfoSmall';
import PopUpFooter from './../general/PopUp/PopUpFooter';

const TransactionDetails = props => {
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
      <View style={{ flex: 4, padding: 10 }}>
        <View style={{ flex: 1 }}>
          <PopUpInfoLarge label={'Type:'} value={label} />
          <PopUpInfoLarge
            label={'Total amount:'}
            sign={total_amount < 0 ? '-' : ''}
            value={
              currency.symbol +
              Math.abs(this.getAmount(total_amount, currency.divisibility))
            }
          />
          <PopUpInfoLine />
          <PopUpInfoSmall
            label={'Amount:'}
            sign={amount < 0 ? '-' : ''}
            value={
              currency.symbol +
              Math.abs(this.getAmount(amount, currency.divisibility))
            }
          />
          <PopUpInfoSmall
            label={'Fees:'}
            sign={fee < 0 ? '-' : ''}
            value={
              currency.symbol +
              Math.abs(this.getAmount(fee, currency.divisibility))
            }
          />
          <PopUpInfoLine />
          <PopUpInfoLarge
            label={'Balance:'}
            sign={balance < 0 ? '-' : ''}
            value={
              currency.symbol +
              Math.abs(this.getAmount(balance, currency.divisibility))
            }
          />
        </View>
      </View>
      <PopUpFooter left={moment(created).format('lll')} right={status} />
    </View>
  );
};

export default TransactionDetails;
