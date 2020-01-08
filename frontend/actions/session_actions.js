import { signup, login, logout} from "./../util/session_api_util";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'


const receiveCurrentUser = currentUser => {
    return {
    type: RECEIVE_CURRENT_USER,
    user: currentUser
    }
}

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

export const loginUser = formUser => dispatch => login(formUser)
    .then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors.responseJSON)));

export const logoutUser = () => dispatch => logout()
    .then(() => dispatch(logoutCurrentUser()));

export const signupUser = formUser => dispatch => signup(formUser)
    .then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors.responseJSON)));