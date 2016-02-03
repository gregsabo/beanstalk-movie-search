import express from 'express';
import assert from 'assert';
import request from 'superagent';

const apikey = process.env.ROTTEN_TOMATOES_API_KEY;
assert(apikey, 'Application needs a rotten tomatoes API key.');
const ROTTEN_TOMATOES_SEARCH_URL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
const ROTTEN_TOMATES_FETCH_URL = 'http://api.rottentomatoes.com/api/public/v1.0/movies/'; // + ID.json;

const router = new express.Router();
export default router;

router.get('/search', async ({query: {q, page}}, res) => {
  const response = await request.get(
    ROTTEN_TOMATOES_SEARCH_URL
  ).query({q, page, apikey});
  res.send(JSON.parse(response.text));
});

router.get('/movies/:id', async ({params: {id}}, res) => {
  const response = await request.get(
    `${ROTTEN_TOMATES_FETCH_URL}/${id}.json`
  ).query({apikey});
  res.send(JSON.parse(response.text));
});
