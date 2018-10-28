import React, { Component } from 'react';
import { View, FlatList, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  uploadDocument,
  resetUserErrors,
  showModal,
  hideModal,
  resetLoading,
} from '../../redux/actions';
import Header from '../../components/header';

import {
  ImageUpload,
  Button,
  Text,
  OutputStatus,
  PopUpGeneral,
  Output,
} from '../../components/common';
import document_categories from '../../config/document_types.json';
import {
  modalOptionsSelector,
  userDocumentsSelector,
} from '../../redux/reducers/UserReducer';
import moment from 'moment';
import { safeString } from '../../util/general';

const SCREEN_WIDTH = Dimensions.get('window').width;

class DocumentScreen extends Component {
  static navigationOptions = {
    title: 'Documents',
  };

  state = {
    document_type: '',
    state: '',
    category: '',
    showModal: false,
    height: 0,
    width: 0,
  };

  componentDidMount() {
    this.resetState();
  }

  resetState() {
    this.props.resetUserErrors();
    this.setState({
      document_type: '',
      state: 'landing',
      category: this.props.navigation.state.params.name,
    });
  }

  selectType = document_type => {
    this.ImageUploadDocument.show();
    this.setState({
      document_type,
    });
  };

  uploadDocument(image) {
    const { category, document_type } = this.state;
    this.props.uploadDocument(image, category, document_type);
  }

  renderContent() {
    const { category, state } = this.state;
    const { updateError, documents } = this.props;
    const {
      textStyleDescription,
      viewStyleContent,
      viewStyleButtonContainer,
      viewStyleImageContainer,
    } = styles;
    let options;

    let document_category = document_categories.filter(
      document_category => document_category.document_category === category,
    );
    if (category) {
      options = document_category[0].document_types;
    }
    switch (state) {
      case 'landing':
        return (
          <View style={viewStyleContent}>
            <Text style={textStyleDescription}>
              Currently uploaded documents{' '}
            </Text>
            <View style={{ maxHeight: SCREEN_WIDTH - 24 }}>
              <FlatList
                contentContainerStyle={[viewStyleButtonContainer]}
                keyboardShouldPersistTaps={'handled'}
                data={documents.data.filter(
                  item => item.document_category === category,
                )}
                renderItem={({ item, index }) =>
                  this.renderUploadedDocument(item, index)
                }
                keyExtractor={item => item.id.toString()}
              />
            </View>
            <Button
              containerStyle={{ padding: 16 }}
              label={'UPLOAD NEW'}
              color="secondary"
              onPress={() => this.setState({ state: 'document_type' })}
            />
          </View>
        );
      case 'document_type':
      default:
        return (
          <View style={viewStyleContent}>
            <Text style={textStyleDescription}>
              Please upload one of the following documents.{' '}
              {category === 'Proof Of Address'
                ? 'Your name and address must be clearly visible and be dated within the last 3 months.'
                : ''}
            </Text>
            <FlatList
              contentContainerStyle={viewStyleButtonContainer}
              data={options}
              renderItem={({ item }) => this.renderTypeButton(item)}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={
                <Button
                  label={'CANCEL'}
                  type="text"
                  color="primary"
                  onPress={() => this.setState({ state: 'landing' })}
                />
              }
            />
          </View>
        );
    }
  }

  renderTypeButton = item => {
    return (
      <Button
        label={item.description}
        color="secondary"
        onPress={() => this.selectType(item.document_type)}
      />
    );
  };

  renderUploadedDocument = (item, index) => {
    console.log(item);
    return (
      <OutputStatus
        label={safeString(item, 'document_type')}
        value={moment(safeString(item, 'created')).format('lll')}
        status={item.status.toUpperCase()}
        onPress={() =>
          this.props.showModal('document', index, this.state.category)
        }
      />
    );
  };

  renderModal() {
    const { modalOptions, hideModal, documents } = this.props;
    // const { modalOptions, hideModal, documents } = this.props;
    const item = documents.data[documents.index];
    const { viewStyleImageContainer, viewStyleFooter } = styles;
    const { visible, type } = modalOptions;
    // const image = Image.getSize(safeString(item, 'file'), (width, height) => {
    //   this.setState({ width, height });
    // });
    const width = SCREEN_WIDTH - 64;
    const height = width;
    // this.state.height > 0
    //   ? Math.min(this.state.height * (width / this.state.width), width)
    //   : width;
    return (
      <PopUpGeneral
        visible={
          visible &&
          (type === 'Proof Of Identity' ||
            type === 'Proof Of Address' ||
            type === 'Advanced Proof Of Identity')
        }
        title={safeString(item, 'document_type')}
        onDismiss={hideModal}
        iconTitleRight={'close'}
        onPressTitleRight={() => hideModal()}
        // contentText={modalContentText}
      >
        {/* <Output label="Document type" value={item.document_type} /> */}
        <View style={viewStyleImageContainer}>
          <Image
            style={{ height, width, borderRadius: 4 }}
            source={{ uri: safeString(item, 'file') }}
            resizeMode={'contain'}
          />
        </View>

        <View style={viewStyleFooter}>
          <View>
            <Text style={{ padding: 0, margin: 0 }}>
              {moment(safeString(item, 'created')).format('lll')}
            </Text>
          </View>
          <View>
            <Text style={{ padding: 0, margin: 0 }}>
              {safeString(item, 'status')}
            </Text>
          </View>
        </View>
      </PopUpGeneral>
    );
  }

  render() {
    const { documents, resetLoading } = this.props;
    const { category } = this.state;
    const { textStyleHeader } = styles;
    console.log('documents', documents);
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Documents" />
        <Text style={textStyleHeader}>{category}</Text>
        {this.renderContent()}
        {this.renderModal()}

        <ImageUpload
          ref={c => (this.ImageUploadDocument = c)}
          onConfirm={image => this.uploadDocument(image)}
          resetLoading={resetLoading}
          error={documents.error}
          success={documents.success}
          loading={documents.loading}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewStyleContent: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
  },
  viewStyleButtonContainer: {
    paddingHorizontal: 8,
  },
  viewStyleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleHeader: {
    fontSize: 20,
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  viewStyleFooter: {
    // flex: 2,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  viewStyleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
};

const mapStateToProps = state => {
  return {
    documents: userDocumentsSelector(state),
    modalOptions: modalOptionsSelector(state),
  };
};

export default connect(mapStateToProps, {
  uploadDocument,
  resetUserErrors,
  showModal,
  hideModal,
  resetLoading,
})(DocumentScreen);
