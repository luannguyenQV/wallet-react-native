// import lib for making component
import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  primaryItem,
  verifyItem,
  showModal,
  hideModal,
} from './../redux/actions';
import { standardizeString } from './../util/general';

import { Card, CardContainer, PopUpGeneral, EmptyListMessage } from './common';

// make component
class CardList extends Component {
  componentDidMount() {
    if (this.props.onRefresh) {
      this.props.onRefresh();
    } else {
      this.props.fetchData(this.props.type);
    }
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
      identifier,
      iconTitleRight,
      onPressTitleRight,
      onPressContent,
      textActionOne,
      textFunctionActionOne,
      onPressActionOne,
      textActionTwo,
      textFunctionActionTwo,
      onPressActionTwo,
      renderContent,
      renderDetail,
      showModal,
      editItem,
      canEdit,
      canVerify,
      verifyItem,
      canPrimary,
      primaryItem,
      canDelete,
      deleteItem,
      profile,
      onPressFooter,
      iconFooter,
    } = this.props;
    return (
      <Card
        headerComponent={headerComponent}
        onPressHeader={onPressHeader}
        textTitleLeft={textTitleLeft ? textTitleLeft(item) : ''}
        iconTitleLeft={iconTitleLeft}
        itemActive={itemActive ? itemActive(item) : false}
        onPressTitleLeft={() =>
          onPressTitleLeft ? onPressTitleLeft(item) : primaryItem(type, item)
        }
        title={title ? title(item) : ''}
        subtitle={subtitle ? subtitle(item) : ''}
        titleStyle={titleStyle}
        onPressTitle={() =>
          onPressTitle
            ? onPressTitle(item)
            : canEdit ? editItem(type, item) : null
        }
        onPressContent={() =>
          onPressContent
            ? onPressContent(item)
            : canEdit ? editItem(type, item) : null
        }
        iconFooter={
          iconFooter
            ? iconFooter
            : canDelete ? (!item.primary ? 'delete' : '') : ''
        }
        onPressFooter={
          onPressFooter
            ? onPressFooter
            : canDelete
              ? (itemActive ? !itemActive(item) : true)
                ? () => showModal(type, item, 'delete')
                : null
              : null
        }
        textActionTwo={
          textActionTwo
            ? textActionTwo
            : canVerify ? (!item.verified ? 'VERIFY' : 'Verified') : ''
        }
        disableActionTwo={canVerify ? (!item.verified ? false : true) : false}
        onPressActionTwo={() =>
          onPressActionTwo
            ? onPressActionTwo(item)
            : canVerify
              ? verifyItem(type, item[identifier], profile.company)
              : null
        }
        textActionOne={
          textActionOne
            ? textActionOne
            : canPrimary ? (item.primary ? 'Primary' : 'MAKE PRIMARY') : ''
        }
        // disableActionOne={canPrimary ? (!item.primary ? false : true) : false}
        onPressActionOne={() =>
          onPressActionOne
            ? onPressActionOne(item)
            : canPrimary ? primaryItem(type, item) : null
        }
        // backgroundColor={canPrimary ? (item.primary ? 'focus' : '') : ''}
        // loading={loading}
        // swipeableContent={<Text>Pull to activate</Text>}
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

  renderModal() {
    const {
      modalVisible,
      modalType,
      hideModal,
      loading,
      type,
      tempItem,
      identifier,
      updateError,
      updateItem,
      deleteItem,
    } = this.props;

    let contentText = '';
    let textActionOne = '';
    let onPressActionOne = null;
    let textActionTwo = 'CANCEL';
    let onPressActionTwo = hideModal;
    if (identifier && tempItem) {
      switch (modalType) {
        case 'delete':
          contentText = 'Delete ' + tempItem[identifier] + '?';
          textActionOne = 'DELETE';
          onPressActionOne = () => deleteItem(type, tempItem);
          break;
        case 'primary':
          contentText = 'Make ' + tempItem[identifier] + ' primary?';
          textActionOne = 'MAKE PRIMARY';
          onPressActionOne = () => updateItem(type, tempItem);
          break;
        case 'verify':
          contentText =
            'Verification email has been sent to  ' + tempItem[identifier];
          textActionTwo = 'CLOSE';
          break;
      }
    }

    return (
      <PopUpGeneral
        visible={modalVisible}
        contentText={standardizeString(contentText)}
        textActionOne={textActionOne}
        onPressActionOne={onPressActionOne}
        onDismiss={hideModal}
        textActionTwo={textActionTwo}
        onPressActionTwo={onPressActionTwo}
        loading={loading}
        errorText={updateError}
      />
    );
  }

  render() {
    const {
      loading,
      loadingData,
      type,
      data,
      keyExtractor,
      renderDetail,
      navigation,
      tempItem,
      showDetail,
      updateError,
      fetchData,
      wallet,
      updateItem,
    } = this.props;
    return (
      <CardContainer>
        {showDetail ? (
          <Card
            textActionOne={wallet ? '' : 'SAVE'}
            onPressActionOne={() => updateItem(type, tempItem)}
            textActionTwo={wallet ? '' : 'CANCEL'}
            onPressActionTwo={() => fetchData(type)}
            loading={loading}>
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
        {this.renderModal()}
      </CardContainer>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const {
    profile,
    showDetail,
    updateError,
    modalVisible,
    loading,
    editing,
    wallet,
    modalType,
  } = user;
  return {
    profile,
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
  verifyItem,
  showModal,
  hideModal,
})(CardList);
