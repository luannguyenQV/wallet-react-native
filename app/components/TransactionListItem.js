import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { performDivisibility } from './../util/general';

import Colors from './../config/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class TransactionListItem extends Component {
  renderItem() {
    const { item, onPress } = this.props;
    const {
      viewStyleContainer,
      iconStyle,
      textStyleHeader,
      textStyleDate,
      textStyleAmount,
      viewStyleAmount,
    } = styles;

    let iconName = '';
    let headerText = '';
    let color = '';
    let headerTextOne = '';
    let headerTextTwo = '';

    switch (item.tx_type) {
      case 'debit':
        // console.log('Debit');
        iconName = 'call-made';
        headerTextOne = 'Sent';
        if (item.destination_transaction) {
          headerTextOne = headerTextOne + ' to ';
          headerTextTwo = item.destination_transaction.user.email;
        }
        color = Colors.positive;
        break;
      case 'credit':
        // console.log('Credit');
        iconName = 'call-received';
        headerTextOne = 'Received';
        if (item.source_transaction) {
          headerTextOne = headerTextOne + ' from ';
          headerTextTwo = item.source_transaction.user.email;
        }
        color = Colors.negative;
        break;
      default:
        iconName = 'question';
        headerText = 'Unknown transaction type';
        color = Colors.warning;
    }

    return (
      // <View style={viewStyleContainer}>
      <TouchableHighlight
        // style={{ flexDirection: 'row' }}
        underlayColor={Colors.lightGray}
        style={{ flex: 1 }}
        // activeOpacity={0.2}
        onPress={() => onPress(item)}>
        <View style={viewStyleContainer}>
          <Icon style={iconStyle} size={24} name={iconName} color={color} />
          <View style={{ paddingLeft: 8, paddingRight: 2 }}>
            {SCREEN_WIDTH < 350 ? (
              <View>
                <Text style={textStyleHeader}>{headerTextOne}</Text>
                <Text style={textStyleHeader}>{headerTextTwo}</Text>
              </View>
            ) : (
              <Text style={textStyleHeader}>
                {headerTextOne}
                {headerTextTwo}
              </Text>
            )}

            <Text style={textStyleDate}>{moment(item.created).fromNow()}</Text>
          </View>
          <Text style={[textStyleAmount, { color: color }]}>
            {item.currency.symbol}{' '}
            {performDivisibility(
              item.amount,
              item.currency.divisibility,
            ).toFixed(item.currency.divisibility)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return <View>{this.renderItem()}</View>;
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingRight: 8,
    paddingLeft: 4,
    justifyContent: 'flex-start',
  },
  viewStyleAmount: {
    // right: 0,
  },
  textStyleHeader: {
    fontSize: 14,
    // padding: 1,
  },
  textStyleDate: {
    fontSize: 10,
    borderBottomColor: 'lightgrey',
  },
  textStyleAmount: {
    // width: 60,
    // justifyContent: 'flex-end',
    position: 'absolute',
    right: 4,
    top: 8,
    fontSize: 14,
  },
};

// const mapStateToProps = (state, ownProps) => {
//   const expanded = (state.selectedLibraryId === ownProps.library.id);
//   return { expanded };
// };

export default TransactionListItem; //connect(mapStateToProps, actions)(ListItem);
