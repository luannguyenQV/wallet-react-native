import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Output, InputContainer, Button } from './../components/common';

class DocumentUploadHelperText extends Component {
  renderItem = item => {
    const { viewStyleOptions, textStyleOptions } = styles;
    console.log(item);
    // return <Button label={'> ' + item.description + ' <'} />;
    return (
      <View>
        <Text>{'> ' + item.description + ' <'}</Text>
        <Text>hi there</Text>
      </View>
    );
  };
  render() {
    const { title, options } = this.props;
    const {
      viewStyleContainer,
      textStyleHeader,
      textStyleDescription,
      viewStyleOptions,
    } = styles;
    console.log('in comp', options);
    return (
      <View style={viewStyleContainer}>
        <View>
          {/* <Text style={textStyleHeader}>{title}</Text>
          <Text style={textStyleDescription}>
            Please upload one of the following documents.{' '}
            {title === 'Proof of Address'
              ? 'Your name and address must be clearly visible and be dated within the last 3 months.'
              : ''}
          </Text> */}
          <FlatList
            contentContainerStyle={viewStyleOptions}
            data={options}
            renderItem={({ item }) => <Text>hi there</Text>}
            keyExtractor={item => item.id}
          />
        </View>
        {/* <View>
          <Text>{'> ' + 'HELLO' + ' <'}</Text>
        </View> */}
      </View>
    );
  }
}
//this.renderItem(item)
const styles = {
  viewStyleContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  viewStyleOptions: {
    // flex: 1,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
