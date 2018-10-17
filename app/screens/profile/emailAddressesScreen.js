import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { newItem, updateItem } from './../../redux/actions';

import Header from './../../components/header';
import CardListUserSettings from './../../components/cards/CardListUserSettings';
import { userEmailsSelector } from '../../redux/reducers/UserReducer';

class EmailAddressesScreen extends Component {
  static navigationOptions = {
    title: 'Email addresses',
  };

  render() {
    const { emails, newItem, updateItem } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Email addresses"
          headerRightIcon={emails.showDetail ? 'done' : 'add'}
          headerRightOnPress={
            emails.showDetail
              ? () => updateItem('email')
              : () => newItem('email')
          }
        />
        <CardListUserSettings type="email" data={emails} />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};

const mapStateToProps = state => {
  return {
    emails: userEmailsSelector(state),
  };
};

export default connect(mapStateToProps, {
  newItem,
  updateItem,
})(EmailAddressesScreen);
