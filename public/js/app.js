const weatherForm = document.querySelector('form');
const msgError = document.querySelector('#msg-error');
const msgSuccess = document.querySelector('#msg-success');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  msgSuccess.textContent = 'Loading...';

  const zip = document.querySelector('input').value;

  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(
    zip
  )}&appid=e83c3a26cc19a0f05c97e5de5aa78ed5&units=imperial`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      msgSuccess.textContent = '';
      msgError.textContent = '';

      if (data.cod !== 200) {
        console.log(data.message);
        msgError.textContent = data.message;
      } else {
        const weather = data.weather[0];
        const temp = data.main;

        msgSuccess.textContent = `Today's weather in ${data.name} feels like ${temp.feels_like} degrees with ${weather.description}`;
      }
    });
  });
});
