const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, key, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${ weatherResults.temperature }. It feels like ${ weatherResults.apparentTemperature }`);
            }
        });
    }
});
