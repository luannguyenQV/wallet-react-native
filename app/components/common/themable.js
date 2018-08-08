import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from './util/config';

//function that receives a component, and returns a new composed component.
export default ComposedComponent =>
  class extends Component {
    // getChildContext() {
    //   return { theme: this.props.theme || this.context.theme };
    // }

    render() {
      let props = Object.assign({}, this.props, { theme: null });
      return (
        <ThemeContext.Consumer>
          {theme => this.props.children}
        </ThemeContext.Consumer>
      );
    }
  };
