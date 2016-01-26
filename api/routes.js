import Promise from 'bluebird';
import express from 'express';
import assert from 'assert';
import request from 'superagent'

const ROTTEN_TOMATOES_API_KEY = process.env.ROTTEN_TOMATOES_API_KEY;
assert(ROTTEN_TOMATOES_API_KEY, 'Application needs a rotten tomatoes API key.');
const ROTTEN_TOMATOES_SEARCH_URL = `http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=${ROTTEN_TOMATOES_API_KEY}`;

const router = new express.Router();
export default router;

router.get('/search', (req, res) => {
  const query = req.query.q;
  const page = req.query.page || '1';
  const finalUrl = ROTTEN_TOMATOES_SEARCH_URL + '&q=' + query + '&page=' + page
  return request.get(
    finalUrl
  ).end((err, response) => {
    res.send(JSON.parse(response.text));
  });
});
