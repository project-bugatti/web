import React, { Component } from 'react';
import {getMembersEndpoint, sendHttp} from '../utils/helper-functions';
import Loading from '../utils/loading';
import FullWidthBlock from '../utils/full-width-block';
import SingleMember from './single-member';
import { FaSort } from 'react-icons/fa';
import { connect } from 'react-redux'
import {LOAD_MEMBERS, SET_MEMBERS_SORT_TYPE} from '../redux-helpers/actions';
import { MEMBERS_SORT_TYPES } from './members-sort-types';
import { sortMembers } from './sort-members';

class Members extends Component {

  componentDidMount() {
    if (this.props.members !== null) {
      return;
    }

    sendHttp('GET', getMembersEndpoint(), null, true, (response) => {
      const members = sortMembers(response.members, MEMBERS_SORT_TYPES.LASTNAME);
      this.saveMembers(members);
    }, (error) => {
      console.log(error);
    });
  }

  onSortTypeChange = (e) => {
    const newSortType = e.currentTarget.value;
    if (newSortType === this.props.membersSortType) {
      return;
    }
    const sortedMembers = sortMembers(this.props.members, newSortType);
    this.saveMembers(sortedMembers);
    this.updateMembersSortType(newSortType);
  };

  saveMembers = (members) => {
    this.props.dispatch({
      type: LOAD_MEMBERS,
      members
    });
  };

  updateMembersSortType = (newSortType) => {
    this.props.dispatch({
      type: SET_MEMBERS_SORT_TYPE,
      membersSortType: newSortType
    })
  };



  render() {
    if (!this.props.members) {
      return(
        <Loading/>
      )
    }
    const baseSortButtonStyles = "border-t border-b border-grey-light bg-white hover:bg-blue-lightest text-grey-darkest py-2 px-4 ";
    return (
      <React.Fragment>

        {/*Filter/sort row*/}
        <FullWidthBlock>
          <div className="inline-flex px-2 overflow-auto">
            {/* Sort Title and Icon */}
            <div className="inline-flex text-lg font-bold text-grey-darkest py-2 pr-2 ">Sort<FaSort/></div>

            {/* Sort by firstname button */}
            <button
              className={baseSortButtonStyles + ' rounded-l border-l ' + (this.props.membersSortType === MEMBERS_SORT_TYPES.FIRSTNAME ? ' font-bold' : '')}
              value={MEMBERS_SORT_TYPES.FIRSTNAME}
              onClick={this.onSortTypeChange}>
              Firstname
            </button>

            {/* Add a left border to act as a divider between the buttons */}
            <span className="border-l border-grey-light"/>

            {/* Sort by lastname button */}
            <button
              className={baseSortButtonStyles + ' rounded-r border-r ' + (this.props.membersSortType === MEMBERS_SORT_TYPES.LASTNAME ? ' font-bold' : '')}
              value={MEMBERS_SORT_TYPES.LASTNAME}
              onClick={this.onSortTypeChange}>
              Lastname
            </button>
          </div>
        </FullWidthBlock>

        {/*Members Grid*/}
        <div className="flex flex-wrap">
          {this.props.members.map(member =>
            <SingleMember member={member} key={member.member_id} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    members: state.members,
    membersSortType: state.membersSortType
  }
}

export default connect(mapStateToProps)(Members);