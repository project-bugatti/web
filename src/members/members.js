import React, { Component } from 'react';
import SingleMember from './single-member';
import connect from "react-redux/es/connect/connect";
import NewItemButton from "../utils/new-item-button";
import NewMemberForm from "./new-member-form";
import {getMembersEndpoint, sendHttpGet} from "../utils/helper-functions";

class Members extends Component {

  constructor(props) {
    super();
    this.state = {
      members: [],
      showMemberForm: false,
    };
  }

  componentDidMount() {
    this.fetchMembers();
  }

  fetchMembers = () => {
    sendHttpGet(getMembersEndpoint(),
      (response) => this.setState({ members: response }),
      (error) => {} );
  };

  toggleShowMemberForm = () => {
    this.setState({ showMemberForm: !this.state.showMemberForm });
  };

  newMemberSubmittedCallback = () => {
    this.toggleShowMemberForm();
    this.fetchMembers();
  };

  render() {

    // hide the member form using CSS, don't remove from DOM
    const memberFormStyles = (this.state.showMemberForm) ? 'visible' : 'hidden';

    return (
      <div>

        {/* Add new member button */}
        <NewItemButton
          buttonTitle={"New Member"}
          showButtonTitle={this.state.showMemberForm}
          parentCallback={this.toggleShowMemberForm}
        />


        {/* Member form */}
        <div className={memberFormStyles}>
          <NewMemberForm parentCallback={this.newMemberSubmittedCallback}/>
        </div>

        {/* List of members */}
        {this.state.members.map((member) =>
          <SingleMember
            member={member}
            key={member.member_id}
          />
        )}
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  appConfigs: state.appConfigs
});

export default connect(mapStateToProps) (Members);