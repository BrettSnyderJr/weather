const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecastUtils = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts' });
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Get help!',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  const resProps = {
    title: 'Weather',
    message: '',
  };

  return res.render('weather', resProps);

  if (!address) {
    resProps.message = 'Address is required';
    return res.render('weather', resProps);
  }

  forecastUtils.getForecast(address, (message) => {
    resProps.message = message;
    return res.render('weather', resProps);
  });
});

const filterByValue = (array, string) => {
  return array.filter((o) =>
    o.name.toLowerCase().includes(string.toLowerCase())
  );
};

const hasQueryString = (string) => {};

// ERRORS

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Not Found',
    errorMessage:
      'Opps! We could not find the help article you were looking for.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 - Not Found',
    errorMessage: 'Opps! We could not find the page you were looking for.',
  });
});

app.listen(3000, () => {
  console.log('Server is up!!!');
});
