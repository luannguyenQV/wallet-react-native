import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { newItem, updateItem } from './../../redux/actions';

import Header from './../../components/header';
import { userAddressesSelector } from '../../redux/reducers/UserReducer';
import CardListUserSettings from '../../components/cards/CardListUserSettings';

class AddressesScreen extends Component {
  static navigationOptions = {
    title: 'Addresses',
  };

  render() {
    const { addresses, newItem, updateItem } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Addresses"
          headerRightIcon={addresses.showDetail ? 'done' : 'add'}
          headerRightOnPress={
            addresses.showDetail
              ? () => updateItem('address')
              : () => newItem('address')
          }
        />
        <CardListUserSettings
          // onRefresh={() => console.log('refreshing')}
          type="address"
          data={addresses}
          // tempItem={tempItem}
          identifier="line_1"
          // renderItem={<Text>Hello World </Text>}
          emptyListMessage="No addresses added yet"
          // canDelete
          // canEdit
          // canVerify
          // canPrimary
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  viewStyleContent: {
    padding: 8,
  },
};

const mapStateToProps = state => {
  return {
    addresses: userAddressesSelector(state),
  };
};

export default connect(mapStateToProps, {
  newItem,
  updateItem,
})(AddressesScreen);
