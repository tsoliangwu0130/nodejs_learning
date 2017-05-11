const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=2201%20NW%20Grant%20Ave%20corvallis',
    json: true
}, (error, response, body) => {
    console.log(body);
});
