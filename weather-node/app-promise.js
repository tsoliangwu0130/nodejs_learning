// TODO: Implement defult location
// TODO: Retrieve more detailed info

const axios = require('axios');
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

var key = '4a3cf3d4da00f9d174f3193e58643c59'; // should be read from config file
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${ encodedAddress }`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/${ key }/${ lat },${ lng }`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${ temperature }. It feels like ${ apparentTemperature }`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server.');
    } else {
        console.log(e.message);
    }
});
