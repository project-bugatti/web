import {
  LOAD_MEMBERS,
  SET_MEMBERS_SORT_TYPE,
  LOAD_ACCESS_TOKEN
} from './actions';

function reducers(state = {}, action) {

  switch (action.type) {
    case LOAD_MEMBERS:
      return Object.assign( {}, state, {
        members: action.members
      });

    case SET_MEMBERS_SORT_TYPE:
      return Object.assign({}, state, {
        membersSortType: action.membersSortType
      });

    case LOAD_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken
      });

    default:
      return state;
  }
}

export default reducers;