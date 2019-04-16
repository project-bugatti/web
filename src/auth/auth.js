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

  tokenRenewalTimeout;

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.createSessionId();
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  setSession = (authResult) => {
    console.log('set session', authResult);
    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    this.scheduleRenewal();

    // navigate to the redirect route or home route
    history.replace(localStorage.getItem(REDIRECT_ROUTE) || '/');
  };

  createSessionId = () => {
    const body = {
      access_token: this.accessToken,
      id_token: this.idToken,
      expires_at: this.expiresAt.toString()
    };

    sendHttp('POST', getSessionEndpoint(), body, true, (response) => {
      const session_id = response.session.session_id;
      const cookie = new Cookies();
      cookie.remove(COOKIE_SESSION_ID_KEY);
      cookie.set(COOKIE_SESSION_ID_KEY, session_id, {path: '/', secure: true, httpOnly: false});
    }, (error) => {
      console.log(error);
    });
  };

  reinitSession = () => {
    const cookie = new Cookies();
    const session_id = cookie.get(COOKIE_SESSION_ID_KEY);
    if (session_id == null) {
      return;
    }

    sendHttp('GET', getSessionEndpoint() + session_id, null, true, (response) => {
      console.log('reinit response', response);
      const authResult = {
        accessToken: response.session.access_token,
        idToken: response.session.id_token,
        expiresIn: response.session.expires_at - new Date().getTime(),
      };

      this.setSession(authResult);

    }, (error) => {
      console.log(error);
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

  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    clearTimeout(this.tokenRenewalTimeout);

    new Cookies().remove(COOKIE_SESSION_ID_KEY);

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