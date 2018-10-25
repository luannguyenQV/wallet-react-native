import React, { Component } from 'react';
import { View, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  uploadDocument,
  resetUserErrors,
  showModal,
  hideModal,
  resetLoading,
} from '../../redux/actions';
import Header from '../../components/header';

import { ImageUpload, Button, Spinner, Text } from '../../components/common';
import document_categories from '../../config/document_types.json';
import { modalOptionsSelector } from '../../redux/reducers/UserReducer';

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
      state: 'document_type',
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
    this.props.uploadDocument(image, category, document_type);
  }

  renderContent() {
    const { category, state } = this.state;
    const { updateError } = this.props;
    const {
      textStyleDescription,
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
      case 'document_type':
        return (
          <View style={{ width: '100%' }}>
            <Text style={textStyleDescription}>
              Please upload one of the following documents.{' '}
              {category === 'Proof of Address'
                ? 'Your name and address must be clearly visible and be dated within the last 3 months.'
                : ''}
            </Text>
            <FlatList
              contentContainerStyle={viewStyleButtonContainer}
              data={options}
              renderItem={({ item }) => this.renderTypeButton(item)}
              keyExtractor={item => item.id.toString()}
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

  render() {
    const { modalOptions, hideModal } = this.props;
    const { category } = this.state;
    const { textStyleHeader, viewStyleContent } = styles;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Documents" />
        <View style={viewStyleContent}>
          <View>
            <Text style={textStyleHeader}>{category}</Text>
          </View>
          {this.renderContent()}
        </View>

        <ImageUpload
          modalOptions={modalOptions}
          onSave={image => this.uploadDocument(image)}
          onDismiss={() => hideModal()}
          resetLoading={resetLoading}
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
  viewStyleButtonContainer: {
    paddingHorizontal: 8,
  },
  viewStyleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 8,
  },
  textStyleHeader: {
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
  },
};

const mapStateToProps = state => {
  return { modalOptions: modalOptionsSelector(state) };
};

export default connect(mapStateToProps, {
  uploadDocument,
  resetUserErrors,
  showModal,
  hideModal,
  resetLoading,
})(DocumentScreen);
