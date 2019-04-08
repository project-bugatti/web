/*
 * action types
 */

export const LOAD_MEMBERS = 'LOAD_MEMBERS';
export const SET_MEMBERS_SORT_TYPE = 'SET_MEMBERS_SORT_TYPE';
// On the members page, save the sort type (by lastname, by firstname)
// If a user bounces from /members to /quotes back to /members, the sort type is unchanged