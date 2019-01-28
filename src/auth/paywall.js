import React, {Component} from 'react';
import { MdLock } from "react-icons/md";

class Paywall extends Component {

  login = () => {
    this.props.auth.login();
  };

  render() {
    console.log('paywall!');
    return (
      <div className="flex justify-center my-4 mx-8">

        { /* Left side */ }
        <div className="flex bg-white rounded-l-lg shadow">

          { /* Lock icon */ }
          <div className="self-center mx-2">
            <MdLock className="text-red text-3xl"/>
          </div>

          { /* Message */ }
          <div className="flex-auto text-center py-2 mt-3 mb-2 mr-2">
            Please login to view content.
          </div>
        </div>

        { /* Button */ }
        <button
          className="py-2 px-4 bg-teal hover:bg-teal-dark text-teal-lightest font-bold rounded-r-lg"
          onClick={this.login}>
          Login
        </button>

      </div>
    );
  }
}

export default Paywall;