/**
 * cut one of fetch utility
 *  this will most likely be removed in favor of electron's clientRequest
 */
const fetch = require('node-fetch');

export function post(url, body, options) {
  let headers = { 'Content-Type': 'application/json' };

  if (options && options.access_token) {
    headers['Authorization'] = `Bearer ${options.access_token}`;
  }

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw new Error('could not post data');
    });
}