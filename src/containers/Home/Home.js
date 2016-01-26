import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <h1>Welcome to Redux-Decagon</h1>
        <p>A simple starting point for new apps.</p>
      </div>
    );
  }
}
