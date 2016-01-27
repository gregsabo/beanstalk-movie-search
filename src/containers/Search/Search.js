import React, { Component, PropTypes } from 'react';
import connectData from 'helpers/connectData';
import * as searchActions from 'redux/modules/search';
import { connect } from 'react-redux';

function fetchDataDeferred(getState, dispatch) {
  const query = getState().router.location.query.q;
  if (searchActions.currentQuery(getState().search) !== query) {
    return dispatch(searchActions.performSearch(query));
  }
}

function renderMovie(inMovie) {
  return (<div key={inMovie.get('id')}>
    {inMovie.get('title')}
  </div>);
}

@connectData(null, fetchDataDeferred)
@connect(state => ({
  searchState: state.search
}))
export default class Search extends Component {
  static propTypes = {
    searchState: PropTypes.object
  };

  render() {
    const movies = this.props.searchState.get('movies');
    if (!searchActions.isLoaded(this.props.searchState)) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div>
        {movies.map(renderMovie)}
      </div>
    );
  }
}
