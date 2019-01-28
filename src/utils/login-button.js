import React, {Component} from 'react';

class LoginButton extends Component {

  login = () => {
    this.props.auth.login();
  };


  render() {
    return (
      <button
        className="py-2 px-4 rounded bg-white text-teal-dark font-semibold hover:underline"
        onClick={() => this.login()}
      >
        Login
      </button>
    )
  }
}

export default LoginButton;