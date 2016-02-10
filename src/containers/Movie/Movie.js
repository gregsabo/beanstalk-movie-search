import React, { Component, PropTypes } from 'react';
import connectData from 'helpers/connectData';
import * as movieDuck from 'redux/modules/movie';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Link } from 'react-router';
import { Glyphicon, Panel, PageHeader, Jumbotron, Grid, Row, Col } from 'react-bootstrap';

function fetchDataDeferred(getState, dispatch, location, {id}) {
  if (!movieDuck.isLoaded(getState().movie, id)) {
    return dispatch(movieDuck.load(id));
  }
}

function renderSearchLink(searchState) {
  if (!searchState.get('query')) {
    return undefined;
  }
  return (<div>
    <Link to={`/search?q=${searchState.get('query')}&page=${searchState.get('page')}`}>
      <Glyphicon glyph="chevron-left" />
      Back to search
    </Link>
  </div>);
}

function maybeRenderPanel(title, value) {
  if (!value) {
    return undefined;
  }
  return (<Panel header={title}>
    {value}
  </Panel>);
}

@connectData(null, fetchDataDeferred)
@connect(state => ({
  movieIndex: state.movie,
  searchState: state.search
}))
export default class Movie extends Component {
  static propTypes = {
    routeParams: PropTypes.object,
    movieIndex: PropTypes.object,
    searchState: PropTypes.object,
  }
  render() {
    const movie = this.props.movieIndex.get(this.props.routeParams.id);
    if (!movie) {
      return (<Loader
        color="#2C3E50"
        speed={2}
        radius={15}
        length={20}
        top="100px"
        hwaccel
      />);
    }
    let director = null;
    if (movie.get('abridged_directors')) {
      director = movie.get('abridged_directors').first().get('name');
    }
    return (<div>
      <Grid>
        {renderSearchLink(this.props.searchState)}
        <PageHeader>{movie.get('title')} <small>{movie.get('year')}</small></PageHeader>
        <Jumbotron>
          <img src={movie.get('posters').get('detailed')} />
        </Jumbotron>
        <Row>
          <Col md={6}>
            {maybeRenderPanel('MPAA Rating', movie.get('mpaa_rating'))}
          </Col>
          <Col md={6}>
            {maybeRenderPanel('Director', director)}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {maybeRenderPanel('Critic rating', movie.get('ratings').get('critics_score'))}
          </Col>
          <Col md={6}>
            {maybeRenderPanel('Audience rating', movie.get('ratings').get('audience_score'))}
          </Col>
        </Row>
        {maybeRenderPanel('Synopsis', movie.get('synopsis'))}
      </Grid>
    </div>);
  }
}
