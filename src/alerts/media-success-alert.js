import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaArrowCircleRight, FaExclamationCircle} from "react-icons/fa";
import { Link } from 'react-router-dom';

class MediaSuccessAlert extends Component {
  state = {
    showAlert: true
  };

  hideAlert = () => {
    this.setState({ showAlert : false });
  };

  render() {
    if (this.state.showAlert) {
      return (
        <button className="w-full" onClick={ () => this.hideAlert()}>
          <div className="flex m-2 p-4 border-t-4 rounded-b shadow-md text-left bg-teal-lightest border-teal text-teal-darkest">
            <div className="text-2xl py-1 mr-4 text-teal">
              <FaExclamationCircle/>
            </div>
            <div>
              <p className="font-bold">{this.props.title}</p>
              <p className="text-sm"><Link to={this.props.link}>View <FaArrowCircleRight/></Link></p>
            </div>
          </div>
        </button>
      )
    }
    return null;
  }
}
MediaSuccessAlert.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string
};
export default MediaSuccessAlert;


