import axios from "axios";
import store from "../redux-helpers/store";

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
  return store.getState().appConfigs.bugatti_api_endpoint + '/members/';
}

export function getQuotesEndpoint() {
  return store.getState().appConfigs.bugatti_api_endpoint + '/quotes/';
}

export function createNewMember(newMember, callback) {
  const params = {
    firstname: newMember.firstname,
    lastname: newMember.lastname,
    nickname: newMember.nickname,
    phone: newMember.phone
  };

  axios.post(getMembersEndpoint(), params)
    .then( (res) => callback(res))
    .catch( (err) => callback(err));
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

export function sendHttpGet(url, onSuccess, onFailure) {
  axios.get(url)
    .then( (response) => onSuccess(response.data))
    .catch( (error) => onFailure(error));
}