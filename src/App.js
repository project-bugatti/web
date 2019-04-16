import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
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
import PrivateRoute from './auth/private-route';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  console.log('handle auth')
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {

  render() {
    auth.reinitSession();
    return (
      <Router history={history}>
        <React.Fragment>
          <Header auth={auth}/>
          <Switch>
            <PrivateRoute exact path="/" component={Media} auth={auth}/>
            <PrivateRoute path="/quotes/:quote_id" component={QuoteProfile} auth={auth}/>
            <PrivateRoute exact path="/quotes" component={Quotes} auth={auth}/>
            <PrivateRoute path="/members/:member_id" component={MemberProfile} auth={auth}/>
            <PrivateRoute exact path="/members" component={Members} auth={auth}/>
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
  appConfig: state.appConfig
});

export default connect(mapStateToProps) (App);