import axios from 'axios';
import appConfig from '../app-config';
import store from '../redux-helpers/store';

export function prettyPrintPhone(rawPhoneNumber) {
  const cleaned = ('' + rawPhoneNumber).replace(/\D/g, '');

  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  } else {
    return rawPhoneNumber;
  }
}

export function getMembersEndpoint() {
  return appConfig.api.endpoint + 'members/';
}

export function getQuotesEndpoint() {
  return appConfig.api.endpoint + 'quotes/';

}

export function getMediaEndpoint() {
  return appConfig.media.endpoint
}

export function submitNewQuote(newQuote, callback) {
  const params = {
    target_member_id: newQuote.target_member_id,
    quote_text: newQuote.quote_text,
    is_visible: (newQuote.is_visible) ? newQuote.is_visible : true,
  };
  axios.post(getQuotesEndpoint(), params)
    .then( (res) => callback(res))
    .catch( (err) => callback(err));
}

export function sendHttp(method, url, data, useAccessToken, useApiKey, onSuccess, onFailure) {
  let headers = {};

  if (useAccessToken) {
    headers['Authorization'] = 'bearer ' + store.getState().accessToken;
  }

  if (useApiKey) {
    headers['x-api-key'] = appConfig.api.key;
  }

  axios({
    method,
    url,
    data,
    headers
  })
    .then( response => {
      onSuccess(response.data)
    })
    .catch( error => {
      onFailure(error)
    });
}