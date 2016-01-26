import express from 'express';
import assert from 'assert';
import request from 'superagent';

const apikey = process.env.ROTTEN_TOMATOES_API_KEY;
assert(apikey, 'Application needs a rotten tomatoes API key.');
const ROTTEN_TOMATOES_SEARCH_URL = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';

const router = new express.Router();
export default router;

router.get('/search', async ({query: {q, page}}, res) => {
  const response = await request.get(
    ROTTEN_TOMATOES_SEARCH_URL
  ).query({q, page, apikey});
  res.send(JSON.parse(response.text));
});
