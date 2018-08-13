import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Clipboard } from 'react-native';
import { Toast } from 'native-base';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

class Output extends Component {
  renderOutput() {
    const { label, value, copy, onPress } = this.props;

    const {
      viewStyleContent,
      viewStyleLabel,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    return (
      <View style={viewStyleContent}>
        <View style={{ flex: 1 }}>
          {value && label ? (
            <View style={viewStyleLabel}>
              <Text style={[textStyleLabel]}>{label}</Text>
            </View>
          ) : null}
          <View style={viewStyleValue}>
            <Text style={textStyleValue}>{value ? value : label}</Text>
          </View>
        </View>
        {copy ? <Icon name="content-copy" size={20} color={'black'} /> : null}
        {onPress ? <Icon name="open-in-new" size={20} color={'black'} /> : null}
      </View>
    );
  }

  render() {
    const { goTo, gotoAddress, label, value, copy, onPress } = this.props;

    const { viewStyleContainer } = styles;

    return (
      <View style={viewStyleContainer}>
        {goTo ? (
          <TouchableHighlight
            underlayColor={'white'}
            activeOpacity={0.2}
            onPress={() => goTo(gotoAddress, label)}>
            {this.renderOutput()}
          </TouchableHighlight>
        ) : copy ? (
          <TouchableHighlight
            underlayColor={'white'}
            activeOpacity={0.2}
            onPress={() => {
              Clipboard.setString(value);
              Toast.show({ text: 'Copied' });
            }}>
            {this.renderOutput()}
          </TouchableHighlight>
        ) : onPress ? (
          <TouchableHighlight
            underlayColor={'white'}
            activeOpacity={0.2}
            onPress={() => onPress()}>
            {this.renderOutput()}
          </TouchableHighlight>
        ) : (
          this.renderOutput()
        )}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    // flexWrap: 'wrap',
    margin: 8,
  },
  viewStyleContent: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleValue: {
    flexDirection: 'row',
    paddingRight: 8,
  },
  textStyleLabel: {
    fontSize: 12,
    color: 'black',
    opacity: 0.6,
  },
  textStyleValue: {
    paddingLeft: 0,
    paddingTop: 2,
    color: 'black',
    fontWeight: 'normal',
    flex: 1,
    fontSize: 16,
  },
};

export { Output };
