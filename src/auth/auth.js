import history from '../utils/history';
import auth0 from 'auth0-js';
import { REDIRECT_ROUTE } from '../utils/local-storage-keys';
import Cookies from 'universal-cookie';
import {sendHttp, getSessionEndpoint } from '../utils/helper-functions';
import appConfig from '../app-config';

// The key of the cookie that stores the session ID
const COOKIE_SESSION_ID_KEY = 'session_id';

class Auth {

  auth0 = new auth0.WebAuth({
    domain: appConfig.auth0.domain,
    clientID: appConfig.auth0.clientId,
    audience: appConfig.auth0.audience,
    redirectUri: appConfig.auth0.redirectUri,
    responseType: appConfig.auth0.responseType,
    scope: appConfig.auth0.scope
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

    console.log(authResult);

    // Saves the access token and expiration time to Dynamo
    // On a successful insert, a session ID is returned, which is saved locally using a secure cookie
    const body = {
      access_token: this.accessToken
    };
    sendHttp('POST', getSessionEndpoint(), body, true, (response) => {
      const session_id = response.session.session_id;
      new Cookies().set(COOKIE_SESSION_ID_KEY, session_id, {path: '/', secure: true, httpOnly: false});
    }, (error) => {
      console.log(error);
    });

    // navigate to the redirect route or home route
    history.replace(localStorage.getItem(REDIRECT_ROUTE) || '/');
  };


  saveToPersistentStorage(access_token, expires_at) {
    const body = {
      access_token,
      expires_at
    };
    sendHttp('POST', getSessionEndpoint(), body, true, (response) => {
      const session_id = response.session.session_id;
      this.saveSessionLocally(session_id);
    })
  }

  saveSessionLocally(session_id) {
    const cookie = new Cookies();
    cookie.remove(COOKIE_SESSION_ID_KEY); // clear session cookie if one exists
    cookie.set(COOKIE_SESSION_ID_KEY, session_id, {path: '/', secure: true, httpOnly: false});
  }

  getSessionId = () => {
    return new Cookies().get(COOKIE_SESSION_ID_KEY);
  };

  getToken = () => {
    const session_id = this.getSessionId();
    if (!session_id) {
      return;
    }

    sendHttp('GET', getSessionEndpoint() + session_id, null, true, (response) => {
      console.log('response', response);
      return response.session.token;
    }, (error) => {
      console.log('Error retrieving token', error);
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