import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Clipboard } from 'react-native';
import context from './context';

import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

class _Tabs extends Component {
  render() {
    const { children } = this.props;

    const { viewStyleContainer } = styles;

    return (
      <ScrollableTabView
        initialPage={0}
        tabBarTextStyle={{ fontSize: 16 }}
        tabBarBackgroundColor={'white'}
        renderTabBar={() => <ScrollableTabBar />}>
        {children}
      </ScrollableTabView>
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

const Tabs = context(_Tabs);

export { Tabs };
