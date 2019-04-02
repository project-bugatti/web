import React, { Component } from 'react';

class Guest extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {

    const isAuthenticated = this.props.auth.isAuthenticated();

    if (!isAuthenticated) {
      return (
        <React.Fragment>
          <p>You are not logged in</p>
          <button
            type="button"
            onClick={() => this.login()}
            className="self-center py-2 px-4 bg-white hover:bg-blue-lightest border rounded text-grey-darkest"
          >
            Login
          </button>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <p>You are logged in!</p>
        <button
          type="button"
          onClick={() => this.logout()}
          className="self-center py-2 px-4 bg-white hover:bg-blue-lightest border rounded text-grey-darkest"
        >
          Logout
        </button>
      </React.Fragment>
    )
  }
}

export default Guest;