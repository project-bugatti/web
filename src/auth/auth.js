import history from '../utils/history';
import auth0 from 'auth0-js';
import { REDIRECT_ROUTE } from '../utils/local-storage-keys';
import appConfig from '../app-config';
import store from '../redux-helpers/store';
import { LOAD_ACCESS_TOKEN } from "../redux-helpers/actions";

class Auth {

  accessToken;
  idToken;
  expiresAt;
  userProfile;
  tokenRenewalTimeout;

  auth0 = new auth0.WebAuth({
    domain: appConfig.auth0.domain,
    clientID: appConfig.auth0.clientId,
    audience: appConfig.auth0.audience,
    redirectUri: appConfig.auth0.redirectUri,
    responseType: appConfig.auth0.responseType,
    scope: appConfig.auth0.scope
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getExpiryDate = this.getExpiryDate.bind(this);
    this.scheduleRenewal();
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession = (authResult) => {
    localStorage.setItem('isLoggedIn', true);

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Save access token in Redux
    store.dispatch({
      type: LOAD_ACCESS_TOKEN,
      accessToken: this.accessToken
    });

    this.scheduleRenewal();

    // navigate to the redirect route or home route
    history.replace(localStorage.getItem(REDIRECT_ROUTE) || '/');
  };

  renewSession() {
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

  getProfile(cb) {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user profile
    this.userProfile = null;

    clearTimeout(this.tokenRenewalTimeout);

    localStorage.removeItem('isLoggedIn');

    // navigate to the guest route
    history.replace('/guest');
  }

  isAuthenticated() {
    // Check whether the current
    // time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }
}

export default Auth;