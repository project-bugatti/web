import React, { Component } from 'react';

class Home extends Component {

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  render() {

    return (
      <div>
        <p>Home page</p>
      </div>
    )
  }
}

export default Home;