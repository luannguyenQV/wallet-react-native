// import lib for making component
import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import context from './context';
// import { maybeOpenURL } from 'react-native-app-link';
// import { standardizeString } from './../util/general';

import { Card } from './Card';
import { PopUpGeneral } from './PopUpGeneral';
import { EmptyListMessage } from './EmptyListMessage';
import { View } from './View';
import { Text } from './Text';
import { CardAddress } from '../cards';

// make component
class _CardList extends Component {
  componentDidMount() {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    } else {
      // this.props.fetchData(this.props.type);
    }
  }

  renderItem = (item, index) => {
    const {
      headerComponent,
      onPressHeader,
      textTitleLeft,
      iconTitleLeft,
      itemActive,
      onPressTitleLeft,
      title,
      subtitle,
      onPressTitle,
      onPressContent,
      textActionOne,
      onPressActionOne,
      textActionTwo,
      onPressActionTwo,
      renderContent,
      loadingDetail,
      onPressFooter,
      iconFooter,
      data,
      actionOne,
      actionTwo,
    } = this.props;

    return (
      <Card
        headerComponent={headerComponent}
        onPressHeader={onPressHeader}
        textTitleLeft={textTitleLeft}
        iconTitleLeft={iconTitleLeft}
        itemActive={itemActive}
        onPressTitleLeft={() => onPressTitleLeft(index)}
        title={title}
        subtitle={subtitle}
        colorTitleBackground="white"
        onPressTitle={() => onPressTitle(index)}
        onPressContent={() => onPressContent(index)}
        iconFooter={iconFooter}
        onPressFooter={() => onPressFooter()}
        // textActionTwo={textActionTwo}
        // disableActionTwo={canVerify}
        textActionOne={actionOne ? actionOne.text : ''}
        onPressActionOne={actionOne ? actionOne.onPress : () => {}}
        disableActionOne={actionOne ? actionOne.disabled : false}
        textActionTwo={actionTwo ? actionTwo.text : ''}
        onPressActionTwo={actionTwo ? actionTwo.onPress : () => {}}
        loading={loadingDetail}>
        {this.props.renderItem(item, data.showDetail)}
      </Card>
    );
  };

  renderEmptyList() {
    const { refreshing, emptyListMessage } = this.props;
    if (!refreshing) {
      return <EmptyListMessage text={emptyListMessage} />;
    }
    return;
  }

  // renderModal() {
  //   const {
  //     modalVisible,
  //     modalType,
  //     hideModal,
  //     loading,
  //     type,
  //     tempItem,
  //     identifier,
  //     updateError,
  //     temp_otp,
  //     otp,
  //     // redux actions
  //     setActiveCurrency,
  //     updateInputField,
  //     updateItem,
  //     confirmDeleteItem,
  //     verifyItem,
  //     company_config,
  //   } = this.props;

  //   let contentText = '';
  //   let textActionOne = '';
  //   let onPressActionOne = null;
  //   let textActionTwo = 'CANCEL';
  //   let onPressActionTwo = hideModal;
  //   let content = null;
  //   if (identifier && tempItem) {
  //     switch (modalType) {
  //       case 'delete':
  //         contentText = 'Delete ' + tempItem[identifier] + '?';
  //         textActionOne = 'DELETE';
  //         onPressActionOne = () => confirmDeleteItem(type, tempItem);
  //         break;
  //       case 'primary':
  //         contentText =
  //           'You are about to set ' +
  //           tempItem[identifier] +
  //           ' as your primary ' +
  //           type +
  //           ' for this account';
  //         textActionOne = 'MAKE PRIMARY';
  //         onPressActionOne = () => updateItem(type, tempItem);
  //         break;
  //       case 'active':
  //         contentText =
  //           'Set ' +
  //           tempItem.currency.code +
  //           ' as your active wallet so that it will be shown first on the home screen and the top of this list';
  //         textActionOne = 'MAKE ACTIVE';
  //         onPressActionOne = () => setActiveCurrency(tempItem);
  //         break;
  //       case 'verify':
  //         textActionTwo = 'CLOSE';
  //         if (type === 'email') {
  //           contentText =
  //             'Instructions on how to verify your email have been sent to ' +
  //             tempItem;
  //           // content = ( //TODO:
  //           //   <Button
  //           //     label="Open email app"
  //           //     textColor={company_config.colors.primaryContrast}
  //           //     backgroundColor={company_config.colors.primary}
  //           //     onPress={() =>
  //           //       maybeOpenURL('mailto:', {}).catch(err => {
  //           //         console.log(err);
  //           //       })
  //           //     }
  //           //   />
  //           // );
  //         } else if (type === 'mobile') {
  //           // textActionOne = 'VERIFY';
  //           contentText =
  //             'An SMS containing a OTP to verify your mobile has been sent to ' +
  //             tempItem;
  //           content = (
  //             <CodeInput
  //               ref={component => (this._pinInput = component)}
  //               secureTextEntry={false}
  //               activeColor="gray"
  //               autoFocus
  //               inactiveColor="lightgray"
  //               className="border-b"
  //               codeLength={5}
  //               space={7}
  //               size={30}
  //               inputPosition="center"
  //               containerStyle={{ marginTop: 0, paddingBottom: 24 }}
  //               onFulfill={code => verifyItem('mobile', code)}
  //             />
  //           );
  //         }
  //         break;
  //     }
  //   }

  //   return (
  //     <PopUpGeneral
  //       visible={modalVisible}
  //       contentText={standardizeString(contentText)}
  //       textActionOne={textActionOne}
  //       onPressActionOne={onPressActionOne}
  //       onDismiss={hideModal}
  //       textActionTwo={textActionTwo}
  //       onPressActionTwo={onPressActionTwo}
  //       loading={loading}
  //       errorText={updateError}>
  //       {content}
  //     </PopUpGeneral>
  //   );
  // }

  render() {
    const { type, data, keyExtractor, onRefresh } = this.props;
    console.log(data);
    return (
      <View color="grey2">
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false} //data.loading}
              onRefresh={onRefresh}
            />
          }
          keyboardShouldPersistTaps={'handled'}
          data={data.showDetail ? [data.data[data.index]] : data.data}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={
            keyExtractor
              ? keyExtractor
              : item => (item.id ? item.id.toString() : null)
          }
          ListEmptyComponent={this.renderEmptyList()}
        />
      </View>
    );
  }
}

const CardList = context(_CardList);

export { CardList };
