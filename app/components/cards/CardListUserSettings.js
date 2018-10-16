/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
  showDetail,
  hideDetail,
} from './../../redux/actions';
import { CardList, View } from '../common';
import { CardAddress } from './CardAddress';
import { userAddressesSelector } from '../../redux/reducers/UserReducer';
import { CardMobile } from './CardMobile';
import { CardEmail } from './CardEmail';
import { CardBankAccount } from './CardBankAccount';
import { CardCryptoAddress } from './CardCryptoAddress';

// This function takes a component...
function withRedux(CardList, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    // fetch data

    componentDidMount() {
      // ... that takes care of the subscription...
      // DataSource.addChangeListener(this.handleChange);
      // console.log('mounted');
    }

    // fetchData(type) {
    //   this.props.fetchData(type);
    // }

    // showDetail(type, item) {
    //   console.log('detail', type, item);
    //   this.props.showDetail(type, item);
    // }

    // componentWillUnmount() {
    //   DataSource.removeChangeListener(this.handleChange);
    // }

    // handleChange() {
    //   this.setState({
    //     data: selectData(DataSource, this.props)
    //   });
    // }

    renderItem(item, detail) {
      const { type } = this.props;
      switch (type) {
        case 'address':
          return (
            <CardAddress
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
            />
          );
        case 'mobile':
          return (
            <CardMobile
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
            />
          );
        case 'email':
          return (
            <CardEmail
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
            />
          );
        case 'bank_account':
          return (
            <CardBankAccount
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
            />
          );
        case 'crypto_address':
          return (
            <CardCryptoAddress
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
            />
          );
        default:
          return <View />;
      }
    }

    actionOne(item, detail) {
      const { data, type } = this.props;
      switch (type) {
        case 'address':
        case 'mobile':
        case 'email':
        case 'bank_account':
        case 'crypto_address':
          return {
            text: data.showDetail ? 'SAVE' : '',
            onPress: index => console.log('SAVE ', index), //this.props.updateItem(type, index),
            disabled: false,
          };
        default:
          return <View />;
      }
    }

    actionTwo(item, detail) {
      const { data, type } = this.props;
      switch (type) {
        case 'address':
        case 'mobile':
        case 'email':
        case 'bank_account':
        case 'crypto_address':
          return {
            text: data.showDetail ? 'CANCEL' : '',
            onPress: () => this.props.hideDetail(type),
            disabled: false,
          };
        default:
          return <View />;
      }
    }

    render() {
      console.log('props', this.props);
      const { data, type } = this.props;
      return (
        <CardList
          data={data}
          {...this.props}
          onRefresh={() => this.props.fetchData(type)}
          onPressContent={index => this.props.showDetail(type, index)}
          onPressHeader={index => this.props.showDetail(type, index)}
          actionOne={this.actionOne()}
          actionTwo={this.actionTwo()}
          showModal={data.showModal}
          typeModal={data.modalType}
          canDelete
          renderItem={(item, detail) => this.renderItem(item, detail)}
        />
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    // addresses: userAddressesSelector(state),
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
  showDetail,
  hideDetail,
})(withRedux(CardList));
