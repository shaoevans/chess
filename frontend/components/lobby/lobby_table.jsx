import React from "react";
import { connect } from "react-redux";
import { createGameModal, challengeFriendModal, playComputerModal } from "./../../actions/modal_actions";


const LobbyTable = ({createGameModal, challengeFriendModal, playComputerModal}) => (
    <div className="lobby-table">
        <button onClick={createGameModal}>CREATE A GAME</button>
        <button onClick={challengeFriendModal}>PLAY WITH A FRIEND</button>
        <button onClick={playComputerModal}>PLAY WITH THE COMPUTER</button>
        {/* <div className="lobby-table-info">
            <p>1,000 players</p>
            <p>1,000 games in play</p>
        </div> */}
    </div>
)

const mapDispatchToProps = dispatch => ({
    createGameModal: () => dispatch(createGameModal()),
    challengeFriendModal: () => dispatch(challengeFriendModal()),
    playComputerModal: () => dispatch(playComputerModal())
})

export default connect(null, mapDispatchToProps)(LobbyTable);