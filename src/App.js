import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import { LOAD_APP_CONFIGURATIONS } from './redux-helpers/actions';
import {sendHttpGet} from "./utils/helper-functions";
import Alert from "./utils/alert";
import Header from "./header/header";
import Callback from "./callback/callback";
import history from './utils/history';
import Home from './home/home';
import Members from "./members/members";
import MemberProfile from './members/member-profile';
import Quotes from './quotes/quotes';
import QuoteProfile from './quotes/quote-profile';

class App extends Component {

  constructor() {
    super();
    this.state = {
      remoteConfigError: false
    }
  }

  componentDidMount() {
    // fetch remote configs
    const APP_CONFIGURATIONS_ENDPOINT = "https://s3.amazonaws.com/project-bugatti/bugatti-web-configs.json";
    sendHttpGet(APP_CONFIGURATIONS_ENDPOINT,
      (response) => this.setRemoteConfigs(response),
      (error) => {
      console.log(error)
      this.setState({remoteConfigError: true })
      }
    );
  }

  setRemoteConfigs = (configs) => {
    configs.bugatti_api_endpoint = configs.api_endpoints.prod;

    this.props.dispatch({
      type: LOAD_APP_CONFIGURATIONS,
      appConfigs: configs
    });

  };

  render() {
    if (this.props.appConfigs) {
      return (
        <Router history={history}>
          <div>
            <Header/>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/quotes/:quote_id" component={QuoteProfile} />
              <Route path="/quotes" component={Quotes} />
              <Route path="/members/:member_id" component={MemberProfile} />
              <Route path="/members" component={Members} />
            </Switch>
          </div>
        </Router>
      );
    } else if (this.state.remoteConfigError) {
      return <Alert
        alertTitle={"There was an error starting up the app"}
        alertSubtext={"Please try again later and thank you for your patience"}
        alertLevel={1}
      />
    }
    return (
      <div>
        <Callback/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (App);