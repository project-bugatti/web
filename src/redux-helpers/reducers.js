import {
  LOAD_CONFIG,
  LOAD_MEMBERS,
  SET_MEMBERS_SORT_TYPE
} from './actions';

function reducers(state = {}, action) {

  switch (action.type) {

    case LOAD_CONFIG:
      return Object.assign({}, state, {
        appConfig: action.appConfig
      });

    case LOAD_MEMBERS:
      return Object.assign( {}, state, {
        members: action.members
      });

    case SET_MEMBERS_SORT_TYPE:
      return Object.assign({}, state, {
        membersSortType: action.membersSortType
      });

    default:
      return state;
  }

}

export default reducers;