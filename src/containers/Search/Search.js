import React, { Component, PropTypes } from 'react';
import connectData from 'helpers/connectData';
import * as searchActions from 'redux/modules/search';
import { QueryInput } from 'components';
import { pushState } from 'redux-router';
import { reduxForm } from 'redux-form';
import { ListGroup, ListGroupItem, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function fetchDataDeferred(getState, dispatch) {
  const routerQuery = getState().router.location.query;
  const query = routerQuery.q;
  const page = Number(routerQuery.page || 1);
  if (!searchActions.isLoaded(getState().search, query, page)) {
    return dispatch(searchActions.performSearch(query, page));
  }
}

function renderMovie(inMovie) {
  const id = inMovie.get('id');
  return (
    <LinkContainer key={id} to={`/movies/${id}`}>
      <ListGroupItem header={inMovie.get('title')}>
        {inMovie.get('year')}
      </ListGroupItem>
    </LinkContainer>
  );
}

@connectData(null, fetchDataDeferred)
@reduxForm({
  form: 'search',
  fields: ['query'],
}, state => ({
  searchState: state.search,
  initialValues: {query: state.search.get('query')},
}), {pushState})
export default class Search extends Component {
  static propTypes = {
    searchState: PropTypes.object,
    fields: PropTypes.object,
    pushState: PropTypes.func,
    initialValues: PropTypes.object,
    pageNum: PropTypes.number,
  };

  render() {
    const queryField = this.props.fields.query;
    const searchState = this.props.searchState;

    const movies = searchState.get('movies');
    const page = Number(searchState.get('page') || 1);
    const query = searchState.get('query');
    const totalPages = searchActions.totalPages(searchState);
    if (!searchActions.isLoaded(searchState, query, page)) {
      return (
        <div>Loading...</div>
      );
    }
    console.log('seems loaded.', searchState);
    return (
      <div>
        <QueryInput queryField={queryField} onSubmit={newQuery => {
          this.props.pushState(null, '/search', {q: newQuery});
        }} />
        <ListGroup>
          {movies.map(renderMovie)}
        </ListGroup>
        <Pagination
          bsSize="large"
          items={totalPages}
          activePage={page}
          onSelect={(event, selectedEvent) => {
            this.props.pushState(null, '/search', {
              q: query,
              page: selectedEvent.eventKey
            });
          }} />
      </div>
    );
  }
}
