import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createMatch } from "./../../actions/match_actions";
import { closeModal } from "./../../actions/modal_actions";
import React from "react";

class ChallengeFriendForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchType: "classical",
            player2Name: "",
            blackPlayerId: null,
            whitePlayerId: null,
        }
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleColorSelect = this.handleColorSelect.bind(this);
    }


    handleType(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value})
        }
    }
    
    handleColorSelect(color) {
        if (color === "black") {
            return "blackPlayerId"
        } else if (color === "white") {
            return "whitePlayerId"
        } else {
            const rand = Math.floor(Math.random() * 2);
            return ["blackPlayerId", "whitePlayerId"][rand];
        }
    }

    handleSubmit(color) {
        return (e) => {
            e.preventDefault();
            this.setState({
                [this.handleColorSelect(color)]: this.props.currentUser.id
            },  () => this.props.createMatch({
                matchType: this.state.matchType,
                whitePlayerId: this.state.whitePlayerId,
                blackPlayerId: this.state.blackPlayerId,
                player2Name: this.state.player2Name
            })             
                .then(payload => {
                this.props.closeModal()
                this.props.history.replace(`/matches/${payload.match.id}`)
            }))
    
        }
    }
    render() {
        return (
            <form>
                <h2>Play with a friend</h2>
                <div className="form-group">
                    <label>Friend Name</label>
                    <input type="text" value={this.state.player2Name} onChange={this.handleType("player2Name")} placeholder="Enter Friend's Username" />
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
                <div className="mode-input time-control">
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
                        <input disabled type="radio"/>
                        <label>Rated</label>
                    </div>
                </div>
                <div className="color-submit-buttons">
                    <button className="color-submit-button" onClick={this.handleSubmit("black")}><i className="black fas fa-chess-king"></i></button>
                    <button className="color-submit-button" onClick={this.handleSubmit("gray")}><i className="black-to-white fas fa-chess-king"></i></button>
                    <button className="color-submit-button" onClick={this.handleSubmit("white")}><i className="white fas fa-chess-king"></i></button>
                </div>
                {/* <input type="range" className="slider"/> */}
            </form>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.username]
})

const mapDispatchToProps = dispatch => ({
    createMatch: match => dispatch(createMatch(match)),
    closeModal: () => dispatch(closeModal())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengeFriendForm))

// const mapStateToProps = ({

// })

// const mapDispatchToProps = ({

// })
// export default connect(mapStateToProps, mapDispatchToProps)(CreateGameForm)