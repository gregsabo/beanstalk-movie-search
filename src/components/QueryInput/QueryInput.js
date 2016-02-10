import React, { Component, PropTypes } from 'react';
import { Input, ButtonInput } from 'react-bootstrap';

export default class Home extends Component {
  static propTypes = {
    queryField: PropTypes.object,
    onSubmit: PropTypes.func
  };

  render() {
    const queryField = this.props.queryField;

    return (
    <form onSubmit={event => {
      event.preventDefault();
      this.props.onSubmit(queryField.value);
    }}>
      <Input autoComplete="off" type="text" label="Search for a movie:" {...queryField} buttonAfter={<ButtonInput type="submit" bsStyle="primary" />}/>
    </form>
    );
  }
}
