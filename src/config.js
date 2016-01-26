require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Movie Search',
    description: 'Find films.',
    head: {
      titleTemplate: 'Movie Search: %s',
      meta: [
        {name: 'description', content: 'Find films.'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'apple-mobile-web-app-status-bar-style', content: '#2C3E50'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Movie Search'},
        {property: 'og:image', content: 'https://beanstalk-movie-search.herokuapp.com/apple-touch-icon.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Movie Search'},
        {property: 'og:description', content: 'Find films.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@gregsabo'},
        {property: 'og:creator', content: '@gregsabo'},
        {property: 'og:title', content: 'Find films.'},
        {property: 'og:description', content: 'Find films.'},
        {property: 'og:image', content: 'https://beanstalk-movie-search.herokuapp.com/apple-touch-icon.jpg'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ],
      link: [
        {'rel': 'apple-touch-startup-image', 'href': '/startup.png'}
      ],
    }
  },

}, environment);
