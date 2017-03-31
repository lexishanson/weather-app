const https = require('https');
const http = require('http');
const api = require('./api.json');

// Print out temp details
// Print out error message
function printError(error) {
  console.error(error.message);
};

function printWeather(weatherData) {
        const message = `Current temperature in ${weatherData.location.city} is
        ${weatherData.current_observation.temp_f} and ${weatherData.current_observation.weather}`;
        console.log(message);
    };

function get (query) {
    const readableQuery = query;
    try {
        const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
            if (response.statusCode === 200) {
                let body = "";
                // Read the data
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    try{
                        const weatherData = JSON.parse(body);
                        if (weatherData.location) {
                            printWeather(weatherData);
                        } else {
                            const queryError = new Error(`The location ${query} was not found`);
                            printError(queryError);
                        }
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const statusCodeError = new Error(
                    `There was an error getting the message for ${readableQuery}. (${https.STATUS_CODE[response.statusCode]})`);
                printError(statusCodeError)
            }
        });
        request.on('error', printError);
    } catch (error) {
        // bad url error
        printError(error);
    }
}

module.exports.get = get;

//TODO: Handle any errors