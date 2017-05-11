const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true // always parse arguments to string
        }
    })
    .help()
    .alias('h', 'help')
    .argv;

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Oregon%20State%20University',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${ body.results[0].formatted_address }`);
    console.log(`Latitude: ${ body.results[0].geometry.location.lat }`);
    console.log(`Longitude: ${ body.results[0].geometry.location.lng }`);
});
