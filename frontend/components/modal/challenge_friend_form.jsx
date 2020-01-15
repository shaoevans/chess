import { connect } from "react-redux";
import React from "react";

class ChallengeFriendForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchType: "classical",
            player2Name: "",
            player1Name: ""
        }
        this.handleType = this.handleType.bind(this);
    }


    handleType(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value})
        }
    }
    
    handleColorSelect(color) {
        return (e) => {
            this.setState({ })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Play with a friend</h2>
                <div className="form-group">
                    <label>Friend Name</label>
                    <input type="text" value={this.state.player2Name} onChange={this.handleType("player2Name")}/>
                </div>
                <div className="mode-input">
                    <label>Variant</label>
                    <select>
                        <option defaultValue value="books">Standard</option>
                        <option disabled value="html">Crazyhouse</option>
                        <option disabled value="css">Chess960</option>
                        <option disabled value="php">King of the Hill</option>
                        <option disabled value="js">Three-check</option>
                    </select>
                </div>
                <div className="mode-input">
                    <label>Time control</label>
                    <select>
                        <option disabled value="books">Real time</option>
                        <option disabled value="html">Correspondance</option>
                        <option defaultValue value="css">Unlimited</option>
                    </select>
                </div>
                <div className="rated-input">
                    <div>
                        <input type="radio"/>
                        <label>Casual</label>
                    </div>
                    <div>
                        <input type="radio"/>
                        <label>Rated</label>
                    </div>
                </div>
                <div className="color-submit-buttons">
                    <button className="color-submit-button" type="submit"><i className="black fas fa-chess-king"></i></button>
                    <button className="color-submit-button" type="submit"><i className="black-to-white fas fa-chess-king"></i></button>
                    <button className="color-submit-button" type="submit"><i className="white fas fa-chess-king"></i></button>
                </div>
                {/* <input type="range" className="slider"/> */}
            </form>
        )
    }
}

export default ChallengeFriendForm;

// const mapStateToProps = ({

// })

// const mapDispatchToProps = ({

// })
// export default connect(mapStateToProps, mapDispatchToProps)(CreateGameForm)