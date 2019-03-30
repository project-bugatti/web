import React from 'react';
import { Link } from 'react-router-dom'
import InitialsCircle from "./initials-circle";

const SingleMember = (props) => {
  const memberProfileLink = '/members/' + props.member.member_id;
  return (
    <div className="w-full md:w-1/2 lg:w-1/3">
      <Link
        to={memberProfileLink}
        className="no-underline"
      >

        <div className="flex text-grey-darkest p-2 m-2 overflow-hidden shadow rounded-lg border border-grey-light bg-white hover:bg-blue-lightest">
          <InitialsCircle member={props.member} />
          <p className="self-center overflow-hidden whitespace-no-wrap ml-4 text-xl font-bold">
            {props.member.firstname} {props.member.lastname}
          </p>

        </div>
      </Link>
    </div>
  )
};

export default SingleMember;