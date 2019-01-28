import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import InitialsCircle from "./initials-circle";

class SingleMember extends Component {

  memberProfileLink = '/members/' + this.props.member.member_id;

  render() {
    return (
      <div className="m-2 overflow-hidden shadow-lg bg-grey-lightest rounded-lg border border-grey-light">
        <Link
          to={this.memberProfileLink}
          className="no-underline"
        >

          <div className="flex p-4 text-grey-darkest">
            <InitialsCircle member={this.props.member} />
            <div className="self-center font-bold text-xl ml-4 mt-1 mb-2">
              {this.props.member.firstname} {this.props.member.lastname}
            </div>

            {
              this.props.member.nickname &&
              <div className="self-center text-xl ml-2 mr-1 mt-1 mb-2">
                ({this.props.member.nickname})
              </div>
            }

          </div>
        </Link>
      </div>

    )
  }
}

export default SingleMember;