import React from 'react';

const getInitials = (props) => {
  if (props.member.firstname.length < 1 || props.member.lastname.length < 1) {
    const smileyFace = '😃';
    return smileyFace;
  }
  const firstInitial = props.member.firstname.substr(0, 1);
  const lastInitial = props.member.lastname.substr(0, 1);
  return firstInitial + lastInitial;
};

const getBackgroundColor = (props) => {
  const backgroundColor = props.member.background_color;
  return backgroundColor || 'bg-teal';
};

const InitialsCircle = (props) => {
  const initials = getInitials(props);
  const backgroundColor = getBackgroundColor(props);

  return(
    <div className={backgroundColor + " rounded-full  flex-no-shrink h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center border border-teal-dark"}>
      <span className="text-xl sm:text-2xl text-white">{initials}</span>
    </div>
  )
};


export default InitialsCircle;