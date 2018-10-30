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
        keyboardShouldPersistTaps={'handled'}
        initialPage={0}
        tabBarTextStyle={{ fontSize: 16, color: colors.headerContrast }}
        tabBarBackgroundColor={colors.header}
        style={{
          elevation: 5,
          zIndex: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 2,
          shadowOpacity: 0.15,
        }}
        tabBarUnderlineStyle={{ backgroundColor: colors.headerContrast }}
        renderTabBar={() => (
          <ScrollableTabBar
            tabsContainerStyle={{ justifyContent: 'space-around' }}
            style={{ justifyContent: 'space-around' }}
          />
        )}>
        {children}
      </ScrollableTabView>
    );
  }
}

const Tabs = context(_Tabs);

export { Tabs };
