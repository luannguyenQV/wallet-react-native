/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
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
  fetchAccounts,
  fetchRewards,
  fetchCampaigns,
  confirmActiveItem,
  claimReward,
  verifyItem,
} from './../../redux/actions';
import { CardList, CodeInput, Text } from '../common';
import { CardAddress } from './CardAddress';
import { CardMobile } from './CardMobile';
import { CardEmail } from './CardEmail';
import { CardBankAccount } from './CardBankAccount';
import { CardCryptoAddress } from './CardCryptoAddress';
import { CardPersonalDetails } from './CardPersonalDetails';
import { CardWallet } from './CardWallet';
import { CardReward } from './CardReward';
import { CardCampaign } from './CardCampaign';
import {
  concatAddress,
  concatBankAccount,
  standardizeString,
} from '../../util/general';
import { withNavigationFocus } from 'react-navigation';
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

    renderItem(item, index) {
      const { type, cardListOptions } = this.props;
      const detail = cardListOptions.showDetail;
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
              navigation={this.props.navigation}
            />
          );
        case 'reward':
          return <CardReward item={item} detail={detail} />;
        case 'campaign':
          return <CardCampaign item={item} detail={detail} />;
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
          case 'reward':
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
          // case 'reward':
          //   text = 'SEND';
          //   onPress = () =>
          //     this.props.navigation.navigate('Send', {
          //       currency: item,
          //     });
          //   break;
          default:
        }
      }
      switch (type) {
        case 'campaign':
          text = 'CLAIM';
          onPress = () => this.props.claimReward(index);
          disabled = cardListOptions.indexLoading;
          break;
        default:
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
      const { type, cardListOptions, data, verifyItem } = this.props;
      let content = null;
      console.log('renderModalContent', data);
      switch (cardListOptions.modalType) {
        case 'verify':
          switch (type) {
            case 'mobile':
              content = (
                <View>
                  <Text style={{ margin: 0 }}>
                    {data.data[data.index].number}
                  </Text>
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
                    onFulfill={code => verifyItem('mobile', code)}
                  />
                </View>
              );
              break;
            case 'email':
              content = (
                <Text style={{ margin: 0 }}>{data.data[data.index].email}</Text>
              );
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
          break;
        case 'delete':
        case 'primary':
        case 'active':
          switch (type) {
            case 'mobile':
              text = data.data[data.index].number;
              break;
            case 'address':
              text = concatAddress(data.data[data.index]);
              break;
            case 'bank_account':
              text = concatBankAccount(data.data[data.index]);
              break;
            case 'wallet':
              text =
                standardizeString(data.data[data.index].account_name) +
                ': ' +
                data.data[data.index].currency.code;
              break;
            default:
              text = data.data[data.index][type];
          }
          content = <Text style={{ margin: 0 }}>{text}</Text>;
          break;
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
                'An SMS containing a OTP to verify your mobile has been sent to ';
              break;
            case 'email':
              text =
                'Instructions on how to verify your email have been sent to ';
              break;
            case 'address':
            case 'bank_account':
            case 'crypto_address':
            default:
          }
          break;
        case 'delete':
          text = 'You are about to delete ' + standardizeString(type, false);
          break;
        case 'primary':
          text =
            'You are about to set your primary ' +
            standardizeString(type, false) +
            ' to';
          break;
        case 'active':
          text = 'You are about to set your active currency to';
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
        confirmActiveItem,
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
        case 'active':
          text = 'MAKE ACTIVE';
          onPress = () => confirmActiveItem(type);
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

    iconFooter(item) {
      const { type, cardListOptions } = this.props;
      if (!cardListOptions.showDetail) {
        switch (type) {
          case 'mobile':
          case 'email':
            if (item.primary) {
              return '';
            }
            return 'delete';
          case 'profile':
          case 'wallet':
          case 'reward':
          case 'campaign':
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
        case 'campaign':
          return 'No campaigns added yet';
        case 'reward':
          return 'No rewards claimed yet';
        default:
          return 'No ' + standardizeString(type, false) + ' added yet';
      }
    }

    title(item) {
      const { type, cardListOptions } = this.props;
      if (!cardListOptions.showDetail) {
        switch (type) {
          case 'wallet':
            return item.currency.description;
        }
      }
      switch (type) {
        case 'campaign':
          return item.name;
        case 'reward':
          return item.campaign.name;
      }
      return '';
    }

    subtitle(item) {
      const { type, cardListOptions } = this.props;
      if (!cardListOptions.showDetail) {
        switch (type) {
          case 'wallet':
            return standardizeString(item.account_name);
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

    onRefresh() {
      const { type } = this.props;
      switch (type) {
        case 'wallet':
          this.props.fetchAccounts();
          break;
        case 'reward':
          this.props.fetchRewards();
          break;
        case 'campaign':
          this.props.fetchCampaigns();
          break;
        default:
          this.props.fetchData(type);
          break;
      }
    }

    activeAction(item, index) {
      const { type, cardListOptions, showModal } = this.props;
      let text = '';
      let onPress = () => {};
      let active = false;
      if (type === 'wallet') {
        text = item && item.currency ? item.currency.code : '';
        onPress = () => showModal('wallet', index, 'active');
        active = item && item.active ? item.active : false;
      }
      return {
        text,
        onPress,
        active,
      };
    }

    render() {
      const { data, type, isFocused, cardListOptions } = this.props;
      // console.log(data);
      if (isFocused) {
        return (
          <CardList
            ref={c => (this[type + 'CardList'] = c)}
            data={data}
            cardListOptions={cardListOptions}
            type={type}
            activeAction={(item, index) => this.activeAction(item, index)}
            onRefresh={() => this.onRefresh()}
            onPressContent={index => this.onPressCard(index)}
            onPressTitle={index => this.onPressCard(index)}
            onPressHeader={index => this.onPressCard(index)}
            actionOne={(item, index) => this.actionOne(item, index)}
            actionTwo={(item, index) => this.actionTwo(item, index)}
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
  confirmActiveItem,
  resendVerification,
  fetchAccounts,
  fetchRewards,
  fetchCampaigns,
  claimReward,
  verifyItem,
})(withNavigationFocus(withRedux(CardList)));
