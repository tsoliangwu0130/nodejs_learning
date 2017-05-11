const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Oregon%20State%20University',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${ body.results[0].formatted_address }`);
    console.log(`Latitude: ${ body.results[0].geometry.location.lat }`);
    console.log(`Longitude: ${ body.results[0].geometry.location.lng }`);
});
