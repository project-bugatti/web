import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import { LOAD_CONFIG } from './redux-helpers/actions';
import Callback from "./callback/callback";
import history from './utils/history';
import Media from './media/media';
import Members from "./members/members";
import MemberProfile from './members/member-profile';
import Quotes from './quotes/quotes';
import QuoteProfile from './quotes/quote-profile';
import Header from "./header/header";
import Auth from './auth/auth';
import Guest from "./auth/guest";
import Loading from "./utils/loading";
import PrivateRoute from './auth/private-route';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {

  componentDidMount() {
    let apiEndpoint, apiKey, mediaEndpoint;
    apiEndpoint = process.env.REACT_APP_API_ENDPOINT_DEV;
    apiKey = process.env.REACT_APP_API_KEY_DEV;
    mediaEndpoint = process.env.REACT_APP_MEDIA_ENDPOINT;
    const appConfig = { apiEndpoint, apiKey, mediaEndpoint };
    this.props.dispatch({
      type: LOAD_CONFIG,
      appConfig
    });
  }

  render() {
    if (!this.props.appConfig) {
      return <Loading/>
    }

    return (
      <Router history={history}>
        <React.Fragment>
          <Header auth={auth}/>
          <Switch>
            <PrivateRoute exact path="/" component={Media} auth={auth}/>
            <PrivateRoute path="/quotes/:quote_id" component={QuoteProfile} auth={auth}/>
            <PrivateRoute path="/quotes" component={Quotes} auth={auth}/>
            <PrivateRoute path="/members/:member_id" component={MemberProfile} auth={auth}/>
            <PrivateRoute path="/members" component={Members} auth={auth}/>
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>
            <Route path="/guest" render={(props) => <Guest auth={auth} {...props} />} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  appConfig: state.appConfig,
  redirectRoute: state.redirectRoute
});

export default connect(mapStateToProps) (App);