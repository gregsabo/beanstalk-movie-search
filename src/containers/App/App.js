import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const styles = require('./App.scss');
    const {user} = this.props;
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLinkContainer to="/">
                <a>{config.app.title}</a>
              </IndexLinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/">
                <NavItem>Home</NavItem>
              </LinkContainer>
            </Nav>
            {user &&
            <p>Logged in as <strong>{user.name}</strong>.</p>}
          </Navbar.Collapse>
        </Navbar>

        <Grid fluid>
          <Row>
            <Col xs={12}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
