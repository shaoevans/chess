import React from "react";

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.ind % 2 === 0) {
            return (
                <li className="odd-tile"></li>
            )
        } else {
            return <li className="even-tile"></li>   
        }
    }
}

export default Tile;