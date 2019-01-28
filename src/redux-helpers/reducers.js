import {
  LOAD_APP_CONFIGURATIONS, LOAD_MEMBERS
} from './actions';

function reducers(state = {}, action) {

  switch (action.type) {

    case LOAD_APP_CONFIGURATIONS:
      return Object.assign({}, state, {
        appConfigs: action.appConfigs
      });

    case LOAD_MEMBERS:
      return Object.assign( {}, state, {
        members: action.members
      });

    default:
      return state;
  }

}

export default reducers;