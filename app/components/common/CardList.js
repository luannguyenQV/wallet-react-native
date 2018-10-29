// import lib for making component
import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import context from './context';
// import { maybeOpenURL } from 'react-native-app-link';
// import { standardizeString } from './../util/general';

import { Card } from './Card';
import { PopUpGeneral } from './PopUpGeneral';
import { EmptyListMessage } from './EmptyListMessage';
import { View } from './View';

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
      renderContent,
      loadingDetail,
      onPressFooter,
      iconFooter,
      data,
      actionOne,
      actionTwo,
      cardListOptions,
      activeAction,
    } = this.props;
    // console.log(index, data);

    return (
      <Card
        headerComponent={headerComponent}
        onPressHeader={onPressHeader}
        textTitleLeft={activeAction ? activeAction(item, index).text : false}
        iconTitleLeft={iconTitleLeft}
        itemActive={activeAction ? activeAction(item, index).active : false}
        onPressTitleLeft={activeAction ? activeAction(item, index).onPress : {}}
        title={title(item)}
        subtitle={subtitle(item)}
        colorTitleBackground="white"
        onPressTitle={() => onPressTitle(index)}
        onPressContent={() => onPressContent(index)}
        iconFooter={iconFooter ? iconFooter(item) : ''}
        onPressFooter={() => onPressFooter(index)}
        textActionOne={actionOne ? actionOne(item, index).text : ''}
        onPressActionOne={actionOne ? actionOne(item, index).onPress : () => {}}
        disableActionOne={actionOne ? actionOne(item, index).disabled : false}
        textActionTwo={actionTwo ? actionTwo(item, index).text : ''}
        onPressActionTwo={actionTwo ? actionTwo(item, index).onPress : () => {}}
        disableActionTwo={actionTwo ? actionTwo(item, index).disabled : false}
        loading={
          (data.indexLoading && data.index === index) || cardListOptions.loading
        }
        // errorText={cardListOptions.updateError}
      >
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

  renderModal() {
    const {
      modalOnDismiss,
      modalLoading,
      modalError,
      modalContent,
      modalContentText,
      modalActionOne,
      modalActionTwo,
      cardListOptions,
    } = this.props;
    const { modalVisible } = cardListOptions;
    return (
      <PopUpGeneral
        visible={modalVisible}
        textActionOne={modalActionOne.text}
        onPressActionOne={modalActionOne.onPress}
        textActionTwo={modalActionTwo.text}
        onPressActionTwo={modalActionTwo.onPress}
        onDismiss={modalOnDismiss}
        loading={modalLoading}
        errorText={modalError}
        contentText={modalContentText}>
        {modalContent}
      </PopUpGeneral>
    );
  }

  render() {
    const { data, keyExtractor, onRefresh, type, colors } = this.props;
    console.log(colors.primary);
    // if (cardListOptions.noScroll) {
    //   return <View color="grey2">{this.renderItem(data.data[0], 0)}</View>;
    // }
    return (
      <View color="grey2" keyboardAvoiding>
        <View f={1} color="grey2">
          <FlatList
            style={{ height: '100%' }}
            ref={component => (this[type + 'FlatList'] = component)}
            refreshControl={
              <RefreshControl
                refreshing={data.loading}
                onRefresh={onRefresh}
                colors={[colors.primary]}
              />
            }
            keyboardShouldPersistTaps={'handled'}
            data={data.data}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={item =>
              keyExtractor
                ? keyExtractor(item)
                : item.id ? item.id.toString() : '0'
            }
            ListEmptyComponent={this.renderEmptyList()}
          />
          {this.renderModal()}
        </View>
      </View>
    );
  }
}

const CardList = context(_CardList);

export { CardList };
