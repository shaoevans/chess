import React from "react";
import { connect } from "react-redux";
import { createGameModal } from "./../../actions/modal_actions";
import { withRouter } from "react-router-dom";

class QuickPairingTableItem extends React.Component {
    constructor(props) {
        super(props)
        this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
    }

    ensureLoggedIn() {
        if (this.props.currentUser) {
            this.props.createGameModal();
        } else {
            this.props.history.push("/login")
        }
    }

    render() {
        const {matchTypeNumbers, matchTypeText, createGameModal} = this.props
        return (
            <li onClick={this.ensureLoggedIn} className="quick-pairing-table-item">
                <div className="match-type-number">{matchTypeNumbers}</div>
                <div className="match-type-text">{matchTypeText}</div>
            </li>
        )
    }
}

// const QuickPairingTableItem = ({matchTypeNumbers, matchTypeText, createGameModal}) => (
//     <li onClick={createGameModal} className="quick-pairing-table-item">
//         <div className="match-type-number">{matchTypeNumbers}</div>
//         <div className="match-type-text">{matchTypeText}</div>
//     </li>
// )

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.username]
})



const mapDispatchToProps = dispatch => ({
    createGameModal: () => dispatch(createGameModal()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuickPairingTableItem));