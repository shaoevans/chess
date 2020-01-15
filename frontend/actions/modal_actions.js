export const CLOSE_MODAL = "CLOSE_MODAL";
export const CREATE_GAME_MODAL = "CREATE_GAME_MODAL";
export const CHALLENGE_FRIEND_MODAL = "CHALLENGE_FRIEND_MODAL";
export const PLAY_COMPUTER_MODAL = "PLAY_COMPUTER_MODAL";

export const closeModal = () => ({
    type: CLOSE_MODAL
})

export const createGameModal = () => ({
    type: CREATE_GAME_MODAL
})

export const challengeFriendModal = () => ({
    type: CHALLENGE_FRIEND_MODAL
})

export const playComputerModal = () => ({
    type: PLAY_COMPUTER_MODAL
})