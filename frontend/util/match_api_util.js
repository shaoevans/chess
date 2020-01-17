export const fetchUserCurrentMatches = userId => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${userId}/matches`,
        data: { current: true }
    })
}

export const fetchUserPreviousMatches = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}/matches`,
        data: { previous: true }
    })
)

export const fetchUserMatches = userId => (
    $.ajax({
        method: "GET",
        url: `/api/users/${userId}/matches`,
    })
)

export const fetchAMatch = matchId => (
    $.ajax({
        method: "GET",
        url: `/api/matches/${matchId}`
    })
)

export const createMatch = match => (
    $.ajax({
        method: "POST",
        url: `/api/matches`,
        data: { match }
    })
)
