import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Output extends Component {
  renderOutput() {
    const { label, value, copy } = this.props;

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
        {copy ? <Icon name="content-copy" size={24} color={'black'} /> : null}
      </View>
    );
  }

  render() {
    const { goTo, gotoAddress, label, value, copy } = this.props;

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
              Alert.alert(null, 'Copied');
            }}>
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
