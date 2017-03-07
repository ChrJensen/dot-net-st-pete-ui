/**
 * cut one of fetch utility
 *  this will most likely be removed in favor of electron's clientRequest
 */
const fetch = require('node-fetch');

/**
 *
 * @param url
 * @param options
 * @returns {Promise.<*>}
 */
export function get(url, options) {
  let headers = setHeaders(options);

  return fetch(url, {
    method: 'GET',
    headers
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw new Error('could not get data');
    });
}

/**
 * handles POSTS via fetch
 * @param url
 * @param body
 * @param options
 * @returns {Promise.<*>}
 */
export function post(url, body, options) {
  let headers = setHeaders(options);

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

/**
 * set request headers
 * @param options
 * @returns {Object}
 */
function setHeaders(options) {
  let headers = { 'Content-Type': 'application/json' };

  if (options && options.access_token) {
    headers['Authorization'] = `Bearer ${options.access_token}`;
  }

  return headers;
}