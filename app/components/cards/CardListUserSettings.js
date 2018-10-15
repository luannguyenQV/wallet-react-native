/* BUTTON */
/* Component | Stateless | Styled */
/* This is the main button component. Takes props to adjust it's size, type, color etc */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';
import { CardList } from '../common';
import { userAddressesSelector } from '../../redux/reducers/UserReducer';

// This function takes a component...
function withRedux(CardList, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    // fetch data

    componentDidMount() {
      // ... that takes care of the subscription...
      // DataSource.addChangeListener(this.handleChange);
      console.log('mounted');
    }

    fetchData(type) {
      this.props.fetchData(type);
    }

    // componentWillUnmount() {
    //   DataSource.removeChangeListener(this.handleChange);
    // }

    // handleChange() {
    //   this.setState({
    //     data: selectData(DataSource, this.props)
    //   });
    // }

    render() {
      console.log('props', this.props);
      const { data, type } = this.props.data;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <CardList
          data={data}
          {...this.props}
          onRefresh={() => this.fetchData(type)}
          textActionOne={show => (show ? 'World' : '')}
          textActionTwo={'Hello'}
        />
      );
    }
  };
}

const mapStateToProps = state => {
  return {
    // addresses: userAddressesSelector(state),
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(withRedux(CardList));
