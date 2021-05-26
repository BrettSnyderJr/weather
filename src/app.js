const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecastUtils = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

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

// JSON API endpoint
app.get('/weather', (req, res) => {
  const zip = req.query.zip;

  const resProps = {
    title: 'Weather Search',
    message: '',
    error: false,
  };

  if (!zip) {
    resProps.message = 'Zip is required';
    resProps.error = true;
    //return res.render('weather', resProps);
    return res.send(resProps);
  }

  forecastUtils.getForecast(zip, (message) => {
    resProps.message = message;
    //return res.render('weather', resProps);
    return res.send(resProps);
  });
});

const filterByValue = (array, string) => {
  return array.filter((o) =>
    o.name.toLowerCase().includes(string.toLowerCase())
  );
};

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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = app;
