const weatherForm = document.querySelector('form');
const msgError = document.querySelector('#msg-error');
const msgSuccess = document.querySelector('#msg-success');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  msgSuccess.textContent = 'Loading...';

  const zip = document.querySelector('input').value;

  const url = `/weather?zip=${zip}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      msgSuccess.textContent = '';
      msgError.textContent = '';
      msgError.textContent = data.message;
    });
  });
});
