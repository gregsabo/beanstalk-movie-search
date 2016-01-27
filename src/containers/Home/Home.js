import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Input, ButtonInput } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { pushState } from 'redux-router';

@reduxForm({
  form: 'search',
  fields: ['query']
})
export default class Home extends Component {
  static propTypes = {
    fields: PropTypes.object,
    dispatch: PropTypes.func
  };

  render() {
    const queryField = this.props.fields.query;

    return (
      <div>
        <Helmet title="Home"/>
        <h1>Welcome to movie search.</h1>
        <form onSubmit={event => {
          event.preventDefault();
          const query = queryField.value;
          this.props.dispatch(pushState(null, '/search', {q: query}));
        }}>
          <Input type="text" label="Enter your query:" {...queryField} />
          <ButtonInput type="submit" bsStyle="primary" />
        </form>
      </div>
    );
  }
}
