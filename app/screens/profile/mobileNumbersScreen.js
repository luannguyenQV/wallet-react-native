import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { newItem, updateItem } from './../../redux/actions';

import Header from './../../components/header';
import CardListUserSettings from './../../components/cards/CardListUserSettings';
import { userMobilesSelector } from '../../redux/reducers/UserReducer';

class MobileNumbersScreen extends Component {
  static navigationOptions = {
    title: 'Mobile numbers',
  };

  render() {
    const { mobiles, newItem, updateItem } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Mobile numbers"
          headerRightIcon={mobiles.showDetail ? 'done' : 'add'}
          headerRightOnPress={
            mobiles.showDetail
              ? () => updateItem('mobile')
              : () => newItem('mobile')
          }
        />
        <CardListUserSettings
          type="mobile"
          data={mobiles}
          navigation={this.props.navigation}
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
    mobiles: userMobilesSelector(state),
  };
};

export default connect(mapStateToProps, {
  newItem,
  updateItem,
})(MobileNumbersScreen);
