const http = require('http');
const weather = require('./weather');

const query = process.argv.slice(2).join("_").replace(" ", "_");

weather.get(query);