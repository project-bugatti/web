import React, {Component} from 'react';

class LogoutButton extends Component {

  logout= () => {
    this.props.auth.logout();
  };


  render() {
    return (
      <button
        className="py-2 px-4 rounded bg-white text-teal-dark font-semibold hover:underline"
        onClick={() => this.logout()}
      >
        Logout
      </button>
    )
  }
}

export default LogoutButton;