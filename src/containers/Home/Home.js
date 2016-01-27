import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { reduxForm } from 'redux-form';
import { pushState } from 'redux-router';
import { QueryInput } from 'components';

@reduxForm({
  form: 'search',
  fields: ['query']
}, () => {}, {pushState})
export default class Home extends Component {
  static propTypes = {
    fields: PropTypes.object,
    dispatch: PropTypes.func,
    pushState: PropTypes.func
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <h1>Welcome to movie search.</h1>
        <QueryInput queryField={this.props.fields.query} onSubmit={query => {
          this.props.pushState(null, '/search', {q: query});
        }} />
      </div>
    );
  }
}
