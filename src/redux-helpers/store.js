import configStore from './configure-store';
import { MEMBERS_SORT_TYPES } from '../members/members-sort-types';

const initialReduxStoreConfig = {
  membersSortType: MEMBERS_SORT_TYPES.LASTNAME
};

const store = configStore(initialReduxStoreConfig);

export default store;
