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
          elevation: 1,
          zIndex: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
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
