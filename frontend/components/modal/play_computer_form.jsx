import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createMatch } from "./../../actions/match_actions";
import { closeModal } from "./../../actions/modal_actions";

class PlayComputerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            whitePlayerId: this.props.currentUser.id,
            player2Name: "ai_player_0",
            matchType: "classical",
            blackPlayerId: null
        }
        this.setLevel = this.setLevel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setLevel(e) {
        e.preventDefault();
        this.setState({player2Name: `ai_player_${e.currentTarget.value}`})
        
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createMatch(this.state)
            .then(payload => {
                    this.props.closeModal()
                    this.props.history.push(`/matches/${payload.match.id}`)
                }
            )
    }

    render() {
        return (

            <form>
                <label>Computer Difficulty</label>
                <select onChange={this.setLevel}>
                    <option value="0">Level 0</option>
                    <option value="1">Level 1</option>
                    <option disabled value="2">Level 2</option>
                    <option disabled value="3">Level 3</option>
                    <option disabled value="4">Level 4</option>
                    <option disabled value="5">Level 5</option>
                    <option disabled value="6">Level 6</option>
                    <option disabled value="7">Level 7</option>
                </select>
                {/* <label>Level 0</label>
                <input type="radio" onClick={this.setLevel(0)}/>
                <label>Level 1</label>
                <input type="radio" onClick={this.setLevel(1)}/> */}
                <button type="submit" className="session-form-button" onClick={this.handleSubmit}>Play Computer</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayComputerForm))