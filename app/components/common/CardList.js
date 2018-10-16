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
        iconFooter={iconFooter ? iconFooter(item) : ''}
        onPressFooter={() => onPressFooter(index)}
        textActionOne={actionOne ? actionOne(item, index).text : ''}
        onPressActionOne={actionOne ? actionOne(item, index).onPress : () => {}}
        disableActionOne={actionOne ? actionOne(item, index).disabled : false}
        textActionTwo={actionTwo ? actionTwo(item, index).text : ''}
        onPressActionTwo={actionTwo ? actionTwo(item, index).onPress : () => {}}
        disableActionTwo={actionTwo ? actionTwo(item, index).disabled : false}
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

  renderModal() {
    const {
      modalVisible,
      modalOnDismiss,
      modalLoading,
      modalError,
      modalContent,
      modalContentText,
      modalActionOne,
      modalActionTwo,
    } = this.props;

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
    const { data, keyExtractor, onRefresh } = this.props;
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
        {this.renderModal()}
      </View>
    );
  }
}

const CardList = context(_CardList);

export { CardList };
