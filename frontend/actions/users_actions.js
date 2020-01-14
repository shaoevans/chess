export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_A_USER = "RECEIVE_A_USER";
import * as UsersAPIUtil from "./../util/users_api_util";

const receiveUsers = payload => ({
    type: RECEIVE_USERS,
    payload
})

const receiveAUser = payload => ({
    type: RECEIVE_A_USER,
    payload
})

// export const fetchUsers = () => dispatch => 

export const fetchUser = userId => dispatch => UsersAPIUtil.fetchUser(userId)
    .then(payload => dispatch(receiveAUser(payload)));