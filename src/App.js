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

class App extends Component {

  componentDidMount() {
    let apiEndpoint, apiKey, mediaEndpoint;
    if (process.env.NODE_ENV === "development") {
      apiEndpoint = process.env.REACT_APP_API_ENDPOINT_DEV;
      apiKey = process.env.REACT_APP_API_KEY_DEV;
    } else {
      apiEndpoint = process.env.REACT_APP_API_ENDPOINT_PROD;
      apiKey = process.env.REACT_APP_API_KEY_PROD;
    }
    mediaEndpoint = process.env.REACT_APP_MEDIA_ENDPOINT;
    const appConfig = { apiEndpoint, apiKey, mediaEndpoint };
    this.props.dispatch({
      type: LOAD_CONFIG,
      appConfig
    });
  }

  render() {
    if (this.props.appConfig) {
      return (
        <Router history={history}>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={Media} />
              <Route path="/quotes/:quote_id" component={QuoteProfile} />
              <Route path="/quotes" component={Quotes} />
              <Route path="/members/:member_id" component={MemberProfile} />
              <Route path="/members" component={Members} />
            </Switch>
          </div>
        </Router>
      );
    }
    return (
      <div>
        <Callback/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appConfig: state.appConfig
});

export default connect(mapStateToProps) (App);