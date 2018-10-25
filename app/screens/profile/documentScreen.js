import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
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
  Spinner,
  Text,
  OutputStatus,
} from '../../components/common';
import document_categories from '../../config/document_types.json';
import {
  modalOptionsSelector,
  userDocumentsSelector,
} from '../../redux/reducers/UserReducer';
import moment from 'moment';

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
    this.props.showModal('document', 0, document_type);
    this.setState({
      document_type,
    });
  };

  uploadDocument(image) {
    const { category, document_type } = this.state;
    console.log('uploadDocument');
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
    console.log(options, category);
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
    return (
      <OutputStatus
        label={item.document_type}
        value={moment(item.created).format('lll')}
        status={item.status.toUpperCase()}
        onPress={() =>
          this.props.showModal('document', index, item.document_type)
        }
      />
    );
  };

  render() {
    const { modalOptions, hideModal } = this.props;
    const { category } = this.state;
    const { textStyleHeader, viewStyleContent } = styles;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Documents" />
        <Text style={textStyleHeader}>{category}</Text>
        {this.renderContent()}

        {/* {modalOptions.visible ? (
          <ImageUpload
            ref={ref => {
              this.documentScreenImageUpload = ref;
            }}
            key="documentScreenImageUpload"
            modalOptions={modalOptions}
            onSave={image => this.uploadDocument(image)}
            onDismiss={() => hideModal()}
            resetLoading={resetLoading}
          />
        ) : null} */}
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
