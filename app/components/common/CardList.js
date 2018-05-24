// import lib for making component
import React, { Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  // View,
  FlatList,
  RefreshControl,
} from 'react-native';

import { Card } from './Card';
import { EmptyListMessage } from './EmptyListMessage';

// make component
class CardList extends Component {
  componentDidMount() {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
  }

  renderItem = (item, index) => {
    console.log(item);
    const {
      headerComponent,
      onPressHeader,
      textTitleLeft,
      iconTitleLeft,
      itemActive,
      onPressTitleLeft,
      title,
      subtitle,
      titleStyle,
      onPressTitle,
      textTitleRight,
      iconTitleRight,
      onPressTitleRight,
      onPressContent,
      textActionOne,
      textFunctionActionOne,
      onPressActionOne,
      textActionTwo,
      textFunctionActionTwo,
      onPressActionTwo,
      deleteItem,
      deletable,
      renderContent,
      renderDetail,
    } = this.props;
    return (
      <Card
        headerComponent={headerComponent}
        onPressHeader={onPressHeader}
        textTitleLeft={
          textTitleLeft ? textTitleLeft(item) : (index + 1).toString()
        }
        iconTitleLeft={iconTitleLeft}
        itemActive={itemActive ? itemActive(item) : false}
        onPressTitleLeft={onPressTitleLeft}
        title={title ? title(item) : ''}
        subtitle={subtitle ? subtitle(item) : ''}
        titleStyle={titleStyle}
        onPressTitle={onPressTitle ? onPressTitle(item) : null}
        textTitleRight={textTitleRight}
        iconTitleRight={
          iconTitleRight
            ? iconTitleRight
            : deletable
              ? (itemActive ? !itemActive(item) : true) ? 'md-trash' : ''
              : ''
        }
        onPressTitleRight={
          onPressTitleRight
            ? onPressTitleRight
            : deletable
              ? (itemActive ? !itemActive(item) : true)
                ? deleteItem(item)
                : null
              : null
        }
        onPressContent={onPressContent ? onPressContent : null}
        textActionOne={
          textFunctionActionOne ? textFunctionActionOne(item) : textActionOne
        }
        onPressActionOne={onPressActionOne ? onPressActionOne : null}
        textActionTwo={
          textFunctionActionTwo ? textFunctionActionTwo(item) : textActionTwo
        }
        onPressActionTwo={onPressActionTwo ? onPressActionTwo : null}
        // loading={loading}
      >
        {renderContent ? renderContent(item) : null}
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

  render() {
    const {
      refreshing,
      onRefresh,
      data,
      keyExtractor,
      renderDetail,
      titleStyle,
      titleDetail,
      iconTitleRightDetail,
      onPressTitleRightDetail,
      textActionOneDetail,
      onPressActionOneDetail,
      navigation,
      tempItem,
      showDetail,
    } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.containerStyle}
        behavior={'padding'}
        keyboardVerticalOffset={15}
        enabled>
        <ScrollView
          style={{ flex: 1 }}
          keyboardDismissMode={'interactive'}
          keyboardShouldPersistTaps="always">
          {showDetail ? (
            <Card
              title={titleDetail ? titleDetail : ''}
              // subtitle={subtitle ? subtitle(item) : ''}
              titleStyle={titleStyle}
              iconTitleRight={iconTitleRightDetail}
              onPressTitleRight={onPressTitleRightDetail}
              textActionOne={textActionOneDetail}
              onPressActionOne={onPressActionOneDetail}>
              {renderDetail(
                tempItem ? tempItem : null,
                navigation ? navigation : null,
              )}
            </Card>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              keyExtractor={
                keyExtractor ? keyExtractor : item => (item.id ? item.id : null)
              }
              ListEmptyComponent={this.renderEmptyList()}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    padding: 8,
    backgroundColor: 'whitesmoke',
  },
};

// make component available to other parts of app
export { CardList };
