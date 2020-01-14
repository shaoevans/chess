import React from "react";
import ChessBoard from "./../chess_board/chess_board";
import Timer from "react-compound-timer";


class ChessGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chess-game-container">
                <div className="chess-body">
                    <ChessBoard />
                </div>
                <div className="chess-sidebar">
                    <Timer
                        initialTime={55000}
                        startImmediately={false}
                        direction="backward"
                    >
                        {({ start, resume, pause, stop, reset, timerState }) => (
                            <React.Fragment>
                                <div className="chess-clock">
                                    <div>
                                        <Timer.Minutes />:
                                        <Timer.Seconds />
                                    </div>
                                    <br />
                                    <div>
                                        <button onClick={start}>Start</button>
                                        {/* <button onClick={pause}>Pause</button> */}
                                        {/* <button onClick={resume}>Resume</button> */}
                                        <button onClick={stop}>Stop</button>
                                        {/* <button onClick={reset}>Reset</button> */}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                    <Timer
                        initialTime={55000}
                        startImmediately={false}
                        direction="backward"
                    >
                        {({ start, resume, pause, stop, reset, timerState }) => (
                            <React.Fragment>
                                <div className="chess-clock">
                                    <div>
                                        <Timer.Minutes />:
                                        <Timer.Seconds />
                                    </div>
                                    <br />
                                    <div>
                                        <button onClick={start}>Start</button>
                                        {/* <button onClick={pause}>Pause</button> */}
                                        {/* <button onClick={resume}>Resume</button> */}
                                        <button onClick={stop}>Stop</button>
                                        {/* <button onClick={reset}>Reset</button> */}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                </div>
            </div>
        )
    }
}


export default ChessGame;