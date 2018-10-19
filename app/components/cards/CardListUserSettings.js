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
  confirmDeleteItem,
  confirmPrimaryItem,
  deleteItem,
  updateInputField,
  showDetail,
  hideDetail,
  showModal,
  hideModal,
  resendVerification,
} from './../../redux/actions';
import { CardList, View, CodeInput } from '../common';
import { CardAddress } from './CardAddress';
import { CardMobile } from './CardMobile';
import { CardEmail } from './CardEmail';
import { CardBankAccount } from './CardBankAccount';
import { CardCryptoAddress } from './CardCryptoAddress';
import { CardPersonalDetails } from './CardPersonalDetails';
import { CardWallet } from './CardWallet';
import { CardReward } from './CardReward';
import { concatAddress, standardizeString } from '../../util/general';
import { withNavigation } from 'react-navigation';
import { cardListOptionsSelector } from '../../redux/reducers/UserReducer';

// This function takes a component...
function withRedux(CardList) {
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
              updateItem={this.props.updateItem}
            />
          );
        case 'mobile':
          return (
            <CardMobile
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
              updateItem={this.props.updateItem}
            />
          );
        case 'email':
          return (
            <CardEmail
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
              updateItem={this.props.updateItem}
            />
          );
        case 'bank_account':
          return (
            <CardBankAccount
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
              updateItem={this.props.updateItem}
            />
          );
        case 'crypto_address':
          return (
            <CardCryptoAddress
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
              updateItem={this.props.updateItem}
            />
          );
        case 'profile':
          return (
            <CardPersonalDetails
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
              updateItem={this.props.updateItem}
            />
          );
        case 'wallet':
          return (
            <CardWallet
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
              updateItem={this.props.updateItem}
              hideDetail={() => this.props.hideDetail('wallet')}
              detailLoaded={this.props.cardListOptions.detailLoaded}
            />
          );
        case 'reward':
          return (
            <CardReward
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
              updateItem={this.props.updateItem}
            />
          );
        default:
          return <View />;
      }
    }

    actionOne(item, index) {
      const { cardListOptions, type } = this.props;
      let text = '';
      let onPress = () => {};
      let disabled = false;
      if (cardListOptions.showDetail) {
        switch (type) {
          case 'wallet':
            break;
          default:
            text = 'SAVE';
            onPress = () => this.props.updateItem(type);
        }
      } else {
        switch (type) {
          case 'mobile':
          case 'email':
            text = item.primary ? 'Primary' : 'MAKE PRIMARY';
            onPress = () => this.props.showModal(type, index, 'primary');
            disabled = item.primary ? true : false;
            break;
          case 'wallet':
            text = 'SEND';
            onPress = () =>
              this.props.navigation.navigate('Send', {
                currency: item,
              });
            break;
          default:
        }
      }
      return {
        text,
        onPress,
        disabled,
      };
    }

    actionTwo(item, index) {
      const { cardListOptions, type } = this.props;
      let text = '';
      let onPress = () => {};
      let disabled = false;
      if (cardListOptions.showDetail) {
        switch (type) {
          case 'wallet':
            break;
          default:
            text = cardListOptions.showDetail ? 'CANCEL' : '';
            onPress = () => this.props.hideDetail(type);
        }
      } else {
        switch (type) {
          case 'mobile':
          case 'email':
            text = item.verified ? 'Verified' : 'VERIFY';
            onPress = () => this.props.resendVerification(type, index);
            disabled = item.verified ? true : false;
            break;
          case 'wallet':
            text = 'RECEIVE';
            onPress = () =>
              this.props.navigation.navigate('Receive', {
                currency: item,
              });
            break;
          default:
        }
      }
      return {
        text,
        onPress,
        disabled,
      };
    }

    onPressCard(index) {
      const { type, cardListOptions } = this.props;
      if (!cardListOptions.showDetail) {
        switch (type) {
          case 'mobile':
          case 'email':
            break;
          default:
            this.props.showDetail(type, index);
        }
      }
    }

    renderModalContent() {
      const { type, cardListOptions } = this.props;
      let content = null;
      switch (cardListOptions.modalType) {
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
      const { data, cardListOptions, type } = this.props;
      let text = '';
      switch (cardListOptions.modalType) {
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
          break;
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
            'You are about to set your primary ' +
            type +
            ' to:\n' +
            data.data[data.index][type];
          break;
      }
      return text;
    }

    modalActionOne() {
      const {
        type,
        cardListOptions,
        confirmDeleteItem,
        confirmPrimaryItem,
      } = this.props;
      let text = '';
      let onPress = () => {};
      let disabled = false;
      switch (cardListOptions.modalType) {
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
      const { type, cardListOptions, hideModal } = this.props;
      let text = 'CANCEL';
      let onPress = () => hideModal();
      let disabled = false;
      if (type === 'email' && cardListOptions.modalType === 'verify') {
        text = 'CLOSE';
      }
      return {
        text,
        onPress,
        disabled,
      };
    }

    // case 'active':
    //   textActionOne = 'MAKE ACTIVE';
    //   onPressActionOne = () => setActiveCurrency(tempItem);

    iconFooter(item) {
      const { type, cardListOptions } = this.props;
      if (!cardListOptions.showDetail) {
        switch (type) {
          case 'mobile':
          case 'email':
            if (item.primary) {
              return '';
            }
          case 'profile':
          case 'wallet':

          case 'reward':
            return '';
          case 'address':
          case 'bank_account':
          case 'crypto_address':
          default:
            return 'delete';
        }
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
        case 'wallet':
          return 'No currencies added yet';
        default:
          return 'No ' + standardizeString(type) + ' added yet';
      }
    }

    title(item) {
      const { type, cardListOptions } = this.props;
      if (!cardListOptions.showDetail) {
        switch (type) {
          case 'wallet':
            return item.currency.description;
          case 'reward':
            return '';
          default:
            return '';
        }
      }
      return '';
    }

    subtitle(item) {
      const { type, cardListOptions } = this.props;
      if (!cardListOptions.showDetail) {
        switch (type) {
          case 'wallet':
            return standardizeString(item.account_name);
          case 'reward':
            return '';
          default:
            return '';
        }
      }
      return '';
    }

    keyExtractor(item) {
      const { type } = this.props;
      switch (type) {
        case 'wallet':
          return (item.account + item.currency.code).toString();
        case 'reward':
        // return '';
        default:
          return item.id ? item.id.toString() : '0';
      }
    }

    render() {
      const { data, type, navigation } = this.props;
      const isFocused = navigation.isFocused();
      // console.log('in CardListUserSettings:render', data);
      if (isFocused) {
        // console.log('in CardListUserSettings:render:isFocused', isFocused);
        return (
          <CardList
            ref={c => (this[type + 'CardList'] = c)}
            data={data}
            type={type}
            onRefresh={() => this.props.fetchData(type)}
            onPressContent={index => this.onPressCard(index)}
            onPressHeader={index => this.onPressCard(index)}
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
            title={item => this.title(item)}
            subtitle={item => this.subtitle(item)}
            keyExtractor={item => this.keyExtractor(item)}
          />
        );
      } else return <View />;
    }
  };
}

const mapStateToProps = state => {
  return {
    cardListOptions: cardListOptionsSelector(state),
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
  confirmDeleteItem,
  confirmPrimaryItem,
  resendVerification,
})(withRedux(CardList));
