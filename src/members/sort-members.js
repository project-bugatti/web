import {MEMBERS_SORT_TYPES} from './members-sort-types';

export function sortMembers(members, sortType) {
  if (sortType == null) {
    sortType = this.props.membersSortType;
  }

  if (sortType === MEMBERS_SORT_TYPES.FIRSTNAME) {
    return members.sort(compareFirstname);
  } else {
    return members.sort(compareLastname);
  }
}


function compareFirstname(a, b) {
  if (a.firstname < b.firstname) return -1;
  if (a.firstname > b.firstname) return 1;
  return 0;
}

function compareLastname(a, b) {
  if (a.lastname < b.lastname) return -1;
  if (a.lastname > b.lastname) return 1;
  return 0;
}