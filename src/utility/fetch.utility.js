/**
 * cut one of fetch utility
 *  this will most likely be removed in favor of electron's clientRequest
 */
const fetch = require('node-fetch');

export function post(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}