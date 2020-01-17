import { connect } from "react-redux";
import React from "react";
import { withRouter } from "react-router-dom";
import { closeModal } from "./../../actions/modal_actions";

class CreateGameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchType: "classical"

        }
    }


    componentDidMount() {
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][0])
        }
        
        App.cable.subscriptions.create(
            { channel: "QueueChannel" },
            {
                received: data => {
                    this.props.closeModal();
                    this.props.history.replace(`/matches/${data.matchId}`);
                },
                queue: function(data) {
                    return this.perform("queue", data);
                },
                dequeue: function() {
                    return this.perform("dequeue")
                }
            }
        );
        setTimeout(() => App.cable.subscriptions.subscriptions[0].queue({ playerUsername: this.props.currentUser.username }), 1000) 

    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        App.cable.subscriptions.subscriptions[0].dequeue();
    }


    render() {
        return (
            <div className="queue-box"> 
                <div className="lds-roller">
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
                <p className="loading-text">
                    Finding players...
                </p>
            </div>
            // <form>
            //     <select>
            //         <option value="books">Books</option>
            //         <option value="html">HTML</option>
            //         <option value="css">CSS</option>
            //         <option value="php">PHP</option>
            //         <option value="js">JavaScript</option>
            //     </select>
            //     <input type="range" className="slider"/>
            // </form>
        )
    }
}

// export default CreateGameForm;

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.username]
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGameForm))