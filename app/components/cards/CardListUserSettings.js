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
  confirmPrimaryItem,
  deleteItem,
  updateInputField,
  showDetail,
  hideDetail,
  showModal,
  hideModal,
} from './../../redux/actions';
import { CardList, View, CodeInput } from '../common';
import { CardAddress } from './CardAddress';
import { userAddressesSelector } from '../../redux/reducers/UserReducer';
import { CardMobile } from './CardMobile';
import { CardEmail } from './CardEmail';
import { CardBankAccount } from './CardBankAccount';
import { CardCryptoAddress } from './CardCryptoAddress';
import { concatAddress, standardizeString } from '../../util/general';

// This function takes a component...
function withRedux(CardList, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    // fetch data

    componentDidMount() {
      const { type } = this.props;
      this.props.hideDetail(type);
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

    actionOne(item, index) {
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
      }
    }

    actionTwo(item, index) {
      const { data, type } = this.props;
      let text = '';
      let onPress = () => {};
      let disabled = false;
      switch (type) {
        case 'mobile':
        case 'email':
          text = item.primary ? 'Primary' : 'MAKE PRIMARY';
          onPress = () => this.props.showModal(type, index, 'primary');
          disabled = item.primary ? true : false;

          break;
        case 'address':
        case 'bank_account':
        case 'crypto_address':
          text = data.showDetail ? 'CANCEL' : '';
          onPress = () => this.props.hideDetail(type);
        default:
      }
      return {
        text,
        onPress,
        disabled,
      };
    }

    onPressCard(type, index) {
      switch (type) {
        case 'mobile':
        case 'email':
          break;
        case 'address':
        case 'bank_account':
        case 'crypto_address':
          this.props.showDetail(type, index);
          break;
        default:
          return;
      }
    }

    renderModalContent() {
      const { type, data } = this.props;
      let content = null;
      switch (data.modalType) {
        case 'verify':
          switch (type) {
            case 'mobile':
              content = (
                <CodeInput
                  ref={component => (this._pinInput = component)}
                  secureTextEntry={false}
                  activeColor="gray"
                  autoFocus
                  inactiveColor="lightgray"
                  className="border-b"
                  codeLength={5}
                  space={7}
                  size={30}
                  inputPosition="center"
                  containerStyle={{ marginTop: 0, paddingBottom: 24 }}
                  onFulfill={code => verifyItem('mobile', code)}
                />
              );
              break;
            case 'email':
              // content = ( //TODO:
              //   <Button
              //     label="Open email app"
              //     textColor={company_config.colors.primaryContrast}
              //     backgroundColor={company_config.colors.primary}
              //     onPress={() =>
              //       maybeOpenURL('mailto:', {}).catch(err => {
              //         console.log(err);
              //       })
              //     }
              //   />
              // );
              break;
            case 'address':
            case 'bank_account':
            case 'crypto_address':
            default:
          }
      }
      return content;
    }

    // text =
    //           'Set ' +
    //           tempItem.currency.code +
    //           ' as your active wallet so that it will be shown first on the home screen and the top of this list';

    modalContentText() {
      const { data, type } = this.props;
      console.log(data);
      let text = '';
      switch (data.modalType) {
        case 'verify':
          switch (type) {
            case 'mobile':
              text =
                'An SMS containing a OTP to verify your mobile has been sent to ' +
                data.data[data.index].mobile;
              break;
            case 'email':
              text =
                'Instructions on how to verify your email have been sent to ' +
                data.data[data.index].email;
              break;
            case 'address':
            case 'bank_account':
            case 'crypto_address':
            default:
          }
        case 'delete':
          text =
            'You are about to delete ' +
            type +
            ':\n' +
            (type === 'address'
              ? concatAddress(data.data[data.index])
              : data.data[data.index][type]);
          break;
        case 'primary':
          text =
            'You are about to set ' +
            data.data[data.index][type] +
            ' as your primary ' +
            type +
            '';
          break;
      }
      return text;
    }

    modalActionOne() {
      const { type, data } = this.props;
      let text = '';
      let onPress = () => {};
      let disabled = false;
      switch (data.modalType) {
        case 'delete':
          text = 'DELETE';
          onPress = () => confirmDeleteItem(type);
          break;
        case 'primary':
          text = 'MAKE PRIMARY';
          onPress = () => confirmPrimaryItem(type);
          disabled = false;
          break;
        default:
      }
      return {
        text,
        onPress,
        disabled,
      };
    }

    modalActionTwo() {
      return {
        text: 'CANCEL',
        onPress: () => this.props.hideModal(),
        disabled: false,
      };
    }

    // case 'active':
    //   textActionOne = 'MAKE ACTIVE';
    //   onPressActionOne = () => setActiveCurrency(tempItem);

    iconFooter(item) {
      const { type } = this.props;
      switch (type) {
        case 'mobile':
        case 'email':
          if (item.primary) {
            return '';
          }
        case 'address':
        case 'bank_account':
        case 'crypto_address':
        default:
          return 'delete';
      }
      return '';
    }

    emptyListMessage() {
      const { type } = this.props;
      switch (type) {
        case 'mobile':
          return 'No mobiles added yet';
        case 'email':
          return 'No emails added yet';
        case 'address':
          return 'No addresses added yet';
        case 'bank_account':
          return 'No bank accounts added yet';
        case 'crypto_address':
          return 'No crypto addresses added yet';
        default:
          return 'No ' + standardizeString(type) + ' added yet';
      }
    }

    render() {
      const { data, type } = this.props;
      return (
        <CardList
          data={data}
          onRefresh={() => this.props.fetchData(type)}
          onPressContent={index => this.onPressCard(type, index)}
          onPressHeader={index => this.onPressCard(type, index)}
          actionOne={(item, index) => this.actionOne(item, index)}
          actionTwo={(item, index) => this.actionTwo(item, index)}
          modalVisible={data.modalVisible}
          modalType={data.modalType}
          modalContent={this.renderModalContent()}
          renderItem={(item, index) => this.renderItem(item, index)}
          iconFooter={item => this.iconFooter(item)}
          onPressFooter={index => this.props.showModal(type, index, 'delete')}
          modalContentText={this.modalContentText()}
          modalActionOne={this.modalActionOne()}
          modalActionTwo={this.modalActionTwo()}
          modalOnDismiss={this.modalActionTwo().onPress}
          modalLoading={false}
          modalError={''}
          emptyListMessage={this.emptyListMessage()}
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
  showModal,
  hideModal,
  confirmPrimaryItem,
})(withRedux(CardList));
