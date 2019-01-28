import React, { Component } from 'react';
import {FaExclamationCircle} from "react-icons/fa";

class Alert extends Component {

  alertStyles = "flex m-4 border-t-4 rounded-b px-4 py-3 shadow-md text-left ";
  iconStyles = "text-2xl py-1 mr-4 ";

  constructor() {
    super();
    this.state = {
      showAlert: true
    }
  }

  hideAlert = () => {
    console.log("HIDE")
    this.setState({ showAlert : false });
  };

  updateCSS = () => {
    switch(this.props.alertLevel) {
      case 0:
        this.alertStyles += "bg-teal-lightest border-teal text-teal-darkest";
        this.iconStyles += "text-teal";
        break;
      case 1:
        this.alertStyles += "bg-red-lightest border-red-light text-red-darkest";
        this.iconStyles += "text-red-light";
        break;
      default:
        this.alertStyles += "bg-grey-lightest border-grey text-grey-darkest";
        this.iconStyles += "text-grey";
    }
  };

  render() {
    this.updateCSS();

    if (this.state.showAlert) {
      return (
        <button className="w-full" onClick={ () => this.hideAlert()}>
          <div className={this.alertStyles}>
            <div className={this.iconStyles}>
              <FaExclamationCircle/>
            </div>
            <div>
              <p className="font-bold">{this.props.alertTitle}</p>
              <p className="text-sm">{this.props.alertSubtext}</p>
            </div>
          </div>
        </button>
      )
    }
    return null;
  }
}

export default Alert;