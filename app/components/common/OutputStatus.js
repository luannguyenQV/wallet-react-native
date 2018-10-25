import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Output } from '.';
import context from './context';

class _OutputStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#707070',
    };
  }

  componentDidMount() {
    const { colors } = this.props;
    let color;
    if (this.props.status === 'PENDING') {
      color = colors.font;
    } else if (this.props.status === 'VERIFIED') {
      color = colors.positive;
    } else if (
      this.props.status === 'INCOMPLETE' ||
      this.props.status === 'DENIED' ||
      this.props.status === 'DECLINED'
    ) {
      color = colors.negative;
    }

    this.setState({
      color: color,
    });
  }

  render() {
    const { label, value, status, onPress, colors } = this.props;
    return (
      <View style={[styles.options, { backgroundColor: colors.grey1 }]}>
        <TouchableWithoutFeedback onPress={() => onPress()}>
          <View style={styles.optionsElement}>
            <View style={{ flex: 1 }}>
              <Output label={label} value={value} />
            </View>
            <View style={[styles.submit, { borderColor: this.state.color }]}>
              <Text
                style={[
                  styles.optionsText,
                  { fontSize: 13, color: this.state.color },
                ]}>
                {status}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  options: {
    paddingVertical: 4,
    paddingRight: 8,
    // borderWidth: 1,
    margin: 2,

    borderRadius: 5,
    // height: 70,
  },
  optionsElement: {
    // backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsText: {
    fontSize: 8,
  },
  submit: {
    // padding: 4,
    // height: 24,
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const OutputStatus = context(_OutputStatus);

export { OutputStatus };
