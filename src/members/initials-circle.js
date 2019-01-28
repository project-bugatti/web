import React, { Component } from 'react';

const getInitials = (props) => {
  let firstInitial = props.member.firstname.substr(0, 1);
  let lastInitial = props.member.lastname.substr(0, 1);
  return firstInitial + lastInitial;
};

const getBackgroundColor = (props) => {
  let backgroundColor = props.member.background_color;
  return (backgroundColor) ? backgroundColor : 'bg-teal';
};

class InitialsCircle extends Component {

  initials = getInitials(this.props);
  backgroundColor = getBackgroundColor(this.props);

  render() {
    return(
      <div className={this.backgroundColor + " rounded-full h-16 w-16 flex items-center justify-center border border-teal-dark no-underline"}>
        <span className="text-2xl text-white"> {this.initials} </span>
      </div>
    )
  }
}


export default InitialsCircle;