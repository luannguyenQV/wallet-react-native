import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { ThemeContext } from './../../util/config';

//function that receives a component, and returns a new composed component.
const context = ComposedComponent => {
  class ContextComponent extends Component {
    // getChildContext() {
    //   return { theme: this.props.theme || this.context.theme };
    // }

    render() {
      return (
        <ThemeContext.Consumer>
          {theme => <ComposedComponent {...this.props} colors={theme.colors} />}
        </ThemeContext.Consumer>
      );
    }
  }

  hoistNonReactStatics(ContextComponent, ComposedComponent);

  return ContextComponent;
};

export default context;
