import React from "react";

const LobbySupport = () => {
    return (
        <div className="lobby-support">
            <div className="lobby-support-item">
                <i className="fas fa-briefcase"></i>
                <div className="lobby-support-info">
                    <span className="lobby-support-info-header">Hire Me</span>
                    <span>Like what you see?</span>
                </div>
            </div>
            <a target="_blank" href="https://lichess.org/learn#/" className="lobby-support-item">
                <i className="fas fa-book"></i>
                <div className="lobby-support-info">
                    <span className="lobby-support-info-header">Learn</span>
                    <span>Become a chess god</span>
                </div>
            </a>
        </div>
    )
}

export default LobbySupport;