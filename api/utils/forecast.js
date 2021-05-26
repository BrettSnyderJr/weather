const https = require('https');
const request = require('postman-request');

const getForecast = (zip, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(
    zip
  )}&appid=e83c3a26cc19a0f05c97e5de5aa78ed5&units=imperial`;

  request({ url, json: true }, (error, { body }, { cod }) => {
    if (error || cod !== 200) {
      return callback('Could not fetch weather data.');
    }

    const weather = body.weather[0];
    const temp = body.main;

    return callback(
      `Today's weather in ${body.name} feels like ${temp.feels_like} degrees with ${weather.description}`
    );
  });
};

// Using native node js utility
const getForecastNative = (zip, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(
    zip
  )}&appid=e83c3a26cc19a0f05c97e5de5aa78ed5&units=imperial`;

  const request = https.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data = data + chunk.toString();
    });

    response.on('end', () => {
      const body = JSON.parse(data);

      const weather = body.weather[0];
      const temp = body.main;

      callback(
        `Today's weather in ${body.name} feels like ${temp.feels_like} degrees with ${weather.description}`
      );
    });
  });

  request.on('error', (error) => {
    callback('Could not fetch weather data.');
  });

  request.end();
};

module.exports = {
  getForecast,
  getForecastNative,
};
