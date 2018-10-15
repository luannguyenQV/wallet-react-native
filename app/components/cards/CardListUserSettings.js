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
  showDetail,
  hideDetail,
} from './../../redux/actions';
import { CardList } from '../common';
import { CardAddress } from './CardAddress';
import { userAddressesSelector } from '../../redux/reducers/UserReducer';

// This function takes a component...
function withRedux(CardList, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    // fetch data

    componentDidMount() {
      // ... that takes care of the subscription...
      // DataSource.addChangeListener(this.handleChange);
      // console.log('mounted');
    }

    // fetchData(type) {
    //   this.props.fetchData(type);
    // }

    // showDetail(type, item) {
    //   console.log('detail', type, item);
    //   this.props.showDetail(type, item);
    // }

    // componentWillUnmount() {
    //   DataSource.removeChangeListener(this.handleChange);
    // }

    // handleChange() {
    //   this.setState({
    //     data: selectData(DataSource, this.props)
    //   });
    // }

    render() {
      // console.log('props', this.props);
      const { data, type } = this.props;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <CardList
          data={data}
          {...this.props}
          onRefresh={() => this.props.fetchData(type)}
          onPressContent={item => this.props.showDetail(type, item)}
          onPressHeader={item => this.props.showDetail(type, item)}
          textActionOne={show => (show ? 'SAVE' : '')}
          onPressActionOne={item => this.props.updateItem(type, item)}
          textActionTwo={show => (show ? 'CANCEL' : '')}
          onPressActionTwo={() => this.props.hideDetail(type)}
          renderItem={(item, detail) => (
            <CardAddress
              item={item}
              detail={detail}
              updateInputField={this.props.updateInputField}
            />
          )}
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
  showDetail,
  hideDetail,
})(withRedux(CardList));
