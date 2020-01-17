export const RECEIVE_MATCHES = "RECEIVE_MATCHES"
export const RECEIVE_MATCH = "RECEIVE_MATCH"
import * as MatchAPIUtil from "./../util/match_api_util";

const receiveMatches = matches => ({
    type: RECEIVE_MATCHES,
    matches
})

const receiveAMatch = match => ({
    type: RECEIVE_MATCH,
    match
})

export const fetchUserPreviousMatches = userId => dispatch => MatchAPIUtil.fetchUserPreviousMatches(userId)
    .then(matches => dispatch(receiveMatches(matches)));

export const fetchUserCurrentMatches = userId => dispatch => MatchAPIUtil.fetchUserCurrentMatches(userId)
    .then(matches => dispatch(receiveMatches(matches)));

export const fetchUserMatches = userId => dispatch => MatchAPIUtil.fetchUserMatches(userId)
    .then(matches => dispatch(receiveMatches(matches)));

export const createMatch = match => dispatch => MatchAPIUtil.createMatch(match)
    .then(match => dispatch(receiveAMatch(match)));

export const fetchAMatch = matchId => dispatch => MatchAPIUtil.fetchAMatch(matchId)
    .then(match => dispatch(receiveAMatch(match)));