/* global __dirname */

const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// express middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${ now }: ${ req.method } ${ req.url }`;
    console.log(log);
    fs.appendFile('server.log', `${ log }\n`, (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// maintenance middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// helper functions
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello Express!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to show the page.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
