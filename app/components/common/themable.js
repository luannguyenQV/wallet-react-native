// import React, { Component } from 'react';

// //function that receives a component, and returns a new composed component.
// export default ComposedComponent => class extends Component {
// constructor() {
//  super();
//  if (!ComposedComponent.contextTypes) {
//  ComposedComponent.contextTypes = {};
//  }
//  ComposedComponent.contextTypes.theme = React.PropTypes.string;
//  }
// static contextTypes = {
//  theme: React.PropTypes.string
//  }
// static propTypes = {
//  theme: React.PropTypes.string
//  }
// static childContextTypes = {
//  theme: React.PropTypes.string
//  }
// getChildContext() {
//  return {theme: this.props.theme || this.context.theme};
//  }
// render() {
//  let props = Object.assign({}, this.props, {theme: null});
//  return <ComposedComponent {…props} />;
//  }
// };
