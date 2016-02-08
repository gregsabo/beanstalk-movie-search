import React, { Component, PropTypes } from 'react';
import connectData from 'helpers/connectData';
import * as movieDuck from 'redux/modules/movie';
import { connect } from 'react-redux';
import Loader from 'react-loader';

function fetchDataDeferred(getState, dispatch, location, {id}) {
  if (!movieDuck.isLoaded(getState().movie, id)) {
    return dispatch(movieDuck.load(id));
  }
}

@connectData(null, fetchDataDeferred)
@connect(state => ({
  movieIndex: state.movie
}))
export default class Movie extends Component {
  static propTypes = {
    routeParams: PropTypes.object,
    movieIndex: PropTypes.object,
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
    return (<div>
      <h2>{movie.get('title')}</h2>
      <div>
        <img src={movie.get('posters').get('detailed')} />
      </div>
      <h3>{movie.get('year')} {movie.get('mpaa_rating')}</h3>
      <p>Directed by: {movie.get('abridged_directors').first()}</p>
      <p>Critic rating: {movie.get('ratings').get('critics_score')}</p>
      <p>Audience rating: {movie.get('ratings').get('audience_score')}</p>
      <p>{movie.get('synopsis')}</p>
    </div>);
  }
}
