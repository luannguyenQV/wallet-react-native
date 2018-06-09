import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import Header from './../../components/header';
import { Input, Output } from './../../components/common';
import CardList from './../../components/CardList';

class MobileNumbersScreen extends Component {
  static navigationOptions = {
    title: 'Mobile numbers',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const { number } = item;
    return (
      <View style={viewStyleContent}>
        {number ? <Output label="" value={number} /> : null}
      </View>
    );
  };

  renderDetail = () => {
    const { temp_mobile_number, updateError, updateInputField } = this.props;
    const { number } = temp_mobile_number;

    return (
      <Input
        label="Mobile number"
        placeholder="e.g. +278412345687"
        autoCapitalize="none"
        value={number}
        inputError={updateError}
        onChangeText={input =>
          updateInputField('mobile_number', 'number', input)
        }
      />
    );
  };

  render() {
    const {
      mobile_number,
      loading_mobile_number,
      temp_mobile_number,
      newItem,
      updateItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Mobile numbers"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('mobile_number', temp_mobile_number)
              : () => newItem('mobile_number')
          }
        />
        <CardList
          type="mobile_number"
          data={mobile_number}
          tempItem={temp_mobile_number}
          loadingData={loading_mobile_number}
          identifier="number"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No mobile numbers added yet"
          canDelete
          canVerify
          canPrimary
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

const mapStateToProps = ({ user }) => {
  const {
    mobile_number,
    loading_mobile_number,
    temp_mobile_number,
    showDetail,
  } = user;
  return {
    mobile_number,
    loading_mobile_number,
    temp_mobile_number,
    showDetail,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(MobileNumbersScreen);
