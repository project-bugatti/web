import history from '../utils/history';
import auth0 from 'auth0-js';
import { REDIRECT_ROUTE } from "./redirect-route";
import Cookies from 'universal-cookie';
import {sendHttp, getSessionEndpoint } from "../utils/helper-functions";

class Auth {

  SESSION_ID_KEY = 'session_id';
  clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
  redirectUri = process.env.REACT_APP_AUTH0_CALLBACK;

  auth0 = new auth0.WebAuth({
    domain: 'gcmedia.auth0.com',
    clientID: this.clientID,
    redirectUri: this.redirectUri,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  getAccessToken = () => { return this.accessToken };

  getIdToken() {
    return this.idToken;
  }

  setSession = (authResult) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    this.setLocalSession();

    // navigate to the redirect route or home route
    history.replace(localStorage.getItem(REDIRECT_ROUTE) || '/');
  };

  setLocalSession = () => {
    const body = {
      token: this.idToken
    };
    sendHttp('POST', getSessionEndpoint(), body, true, (response) => {
      console.log('response', response);
      const session_id = response.session.session_id;

      const cookies = new Cookies();
      cookies.set(this.SESSION_ID_KEY, session_id, {path: '/', secure: true, httpOnly: true});
    })
  };

  getSessionId = () => {
    return new Cookies().get(this.SESSION_ID_KEY);
  };

  getToken = () => {
    const session_id = this.getSessionId;
    if (!session_id) {
      return;
    }
    sendHttp('GET', getSessionEndpoint() +'/' + session_id, null, true, (response) => {
      console.log('response', response);
      return response.session.token;
    }, (error) => {
      console.log('error', error);
      return;
    })
  };

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
      }
    });
  };

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    // navigate to the guest route
    history.replace('/guest');
  };

  isAuthenticated = () => {
    // Check whether the current
    // time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  };
}

export default Auth;