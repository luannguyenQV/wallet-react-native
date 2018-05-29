// import lib for making component
import React, { Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  primaryItem,
  showModal,
  hideModal,
} from './../redux/actions';
import { standardizeString } from './../util/general';

import { Card, PopUpGeneral, EmptyListMessage } from './common';

// make component
class CardList extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.type);
    // if (this.props.onRefresh) {
    //   this.props.onRefresh();
    // }
  }

  renderItem = (item, index) => {
    const {
      type,
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
      showModal,
      editItem,
      primaryItem,
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
        onPressTitleLeft={() =>
          onPressTitleLeft ? onPressTitleLeft(item) : primaryItem(type, item)
        }
        title={title ? title(item) : ''}
        subtitle={subtitle ? subtitle(item) : ''}
        titleStyle={titleStyle}
        onPressTitle={() =>
          onPressTitle ? onPressTitle(item) : editItem(type, item)
        }
        textTitleRight={textTitleRight}
        iconTitleRight={
          iconTitleRight
            ? iconTitleRight
            : deletable
              ? (itemActive ? !itemActive(item) : true) ? 'delete' : ''
              : ''
        }
        onPressTitleRight={
          onPressTitleRight
            ? onPressTitleRight
            : deletable
              ? (itemActive ? !itemActive(item) : true)
                ? () => showModal(type, item, 'delete')
                : null
              : null
        }
        onPressContent={onPressContent ? onPressContent : null}
        textActionOne={
          textFunctionActionOne ? textFunctionActionOne(item) : textActionOne
        }
        onPressActionOne={onPressActionOne ? onPressActionOne(item) : null}
        textActionTwo={
          textFunctionActionTwo ? textFunctionActionTwo(item) : textActionTwo
        }
        onPressActionTwo={onPressActionTwo ? onPressActionTwo(item) : null}
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
      loading,
      loadingData,
      editing,
      type,
      identifier,
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
      iconHeaderRight,
      onPressHeaderRight,
      hideModal,
      showModal,
      deleteItem,
      modalVisible,
      updateError,
      loadingModal,
      fetchData,
      wallet,
      updateItem,
      modalType,
      primaryItem,
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
              title={
                wallet
                  ? null
                  : standardizeString((editing ? 'Edit ' : 'Add ') + type)
              }
              titleStyle={titleStyle}
              iconTitleRight={wallet ? '' : 'close'}
              onPressTitleRight={() => fetchData(type)}
              textActionOne={wallet ? '' : 'Save'}
              onPressActionOne={() => updateItem(type, tempItem)}
              loading={loading}
              errorText={updateError}
              // iconHeaderRight={iconHeaderRight}
              // onPressHeaderRight={onPressHeaderRight}
            >
              {renderDetail(
                tempItem ? tempItem : null,
                navigation ? navigation : null,
              )}
            </Card>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loadingData}
                  onRefresh={() => fetchData(this.props.type)}
                />
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
        <PopUpGeneral
          visible={modalVisible}
          contentText={standardizeString(
            (modalType === 'delete'
              ? 'Delete '
              : 'Make ' + tempItem[identifier] + ' primary ') +
              type +
              '?',
          )}
          textActionOne={modalType === 'delete' ? 'Delete' : 'Make primary'}
          onPressActionOne={() =>
            modalType === 'delete'
              ? deleteItem(type, tempItem)
              : updateItem(type, tempItem)
          }
          onDismiss={hideModal}
          textActionTwo="Cancel"
          onPressActionTwo={hideModal}
          loading={loading}
          errorText={updateError}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
};

const mapStateToProps = ({ user }) => {
  const {
    showDetail,
    updateError,
    modalVisible,
    loading,
    editing,
    wallet,
    modalType,
  } = user;
  return {
    showDetail,
    updateError,
    modalVisible,
    loading,
    editing,
    wallet,
    modalType,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  primaryItem,
  showModal,
  hideModal,
})(CardList);
