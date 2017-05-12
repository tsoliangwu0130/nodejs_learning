const request = require('request');

var getWeather = () => {
    request({
        url: 'https://api.darksky.net/forecast/4a3cf3d4da00f9d174f3193e58643c59/44.5637806,-123.2794442',
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(body.currently.temperature);
        } else {
            console.log('Unable to fetch weather.');
        }
    });
};

module.exports.getWeather = getWeather;
