import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Output, InputContainer, Button } from './../components/common';

class DocumentUploadHelperText extends Component {
  renderItem(item) {
    const { viewStyleOptions, textStyleOptions } = styles;
    // return <Button label={'> ' + item.description + ' <'} />;
    return <Text>{'> ' + item.description + ' <'}</Text>;
  }
  render() {
    const { title, options } = this.props;
    const {
      viewStyleContainer,
      textStyleHeader,
      textStyleDescription,
      viewStyleOptions,
    } = styles;
    return (
      <View style={viewStyleContainer}>
        <Text style={textStyleHeader}>{title}</Text>
        <Text style={textStyleDescription}>
          Please upload one of the following documents.{' '}
          {title === 'Proof of Address'
            ? 'Your name and address must be clearly visible and be dated within the last 3 months.'
            : ''}
        </Text>
        <View>
          <FlatList
            // contentContainerStyle={viewStyleOptions}
            data={options}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewStyleOptions: {
    // flex: 1,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyleHeader: {
    fontSize: 20,
    padding: 16,
    textAlign: 'center',
  },
  textStyleDescription: {
    fontSize: 14,
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
    textAlign: 'center',
  },
  textStyleOptions: {
    fontSize: 14,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
};

export default DocumentUploadHelperText;
