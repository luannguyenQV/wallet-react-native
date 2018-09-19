import React, { Component } from 'react';
import context from './context';

import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

class _Tabs extends Component {
  render() {
    const { children, colors } = this.props;

    return (
      <ScrollableTabView
        prerenderingSiblingsNumber={1}
        initialPage={0}
        tabBarTextStyle={{ fontSize: 16, color: colors.headerContrast }}
        tabBarBackgroundColor={colors.header}
        style={{
          elevation: 10,
          zIndex: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 5,
          shadowOpacity: 0.3,
        }}
        tabBarUnderlineStyle={{ backgroundColor: colors.headerContrast }}
        renderTabBar={() => <ScrollableTabBar />}>
        {children}
      </ScrollableTabView>
    );
  }
}

const Tabs = context(_Tabs);

export { Tabs };
