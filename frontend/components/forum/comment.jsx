import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { dateMaker } from "./../../util/date_util";
import { connect } from "react-redux"
import { updateComment } from "./../../actions/forum_actions";

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: this.props.comment.body,
            id: this.props.comment.id,
            showForm: false
        }
        this.toggleFormButton = this.toggleFormButton.bind(this);
        this.onTypeHandler = this.onTypeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    toggleFormButton() {
        this.setState({showForm: !this.state.showForm, body: this.props.comment.body})
    }

    onTypeHandler(e) {
        this.setState({ body: e.currentTarget.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.updateComment(this.state)
            .then(() => this.setState({showForm: false}))
    }

    render() {
        const {comment, index, path, now, fetchUser} = this.props
        const last = new Date(comment.updatedAt);
        const difference = Math.floor((now - last)/(1000*60))
        console.log(comment);
        return ( 
            <li className="comment-container">
                <div id={index} className="comment-header">
                    <div className="comment-info">
                        <div onMouseOver={fetchUser(comment.author.username)}>
                            <i className="fas fa-circle"></i>
                            <Link to={`/users/${comment.author.username}`}>{comment.author.username}</Link>
                            <div>
                            </div>
                        </div>
                        <span>{dateMaker(difference)}</span>
                        {this.props.currentUser &&  (this.props.currentUser.username === comment.author.username) ? <button className="edit-post-button" onClick={this.toggleFormButton}><i className="fas fa-pencil-alt"></i>Edit Post</button> : null}
                    </div>
                    <span><HashLink smooth to={`${path}#${index}`}>#{index}</HashLink></span>
                </div>
                <div id={index}className="comment-body">
                    {comment.body}
                </div>
                {this.state.showForm && 
                    <form className="update-comment-form">
                        <textarea onChange={this.onTypeHandler} value={this.state.body}></textarea>
                        <div className="update-comment-buttons">
                            <button className="update-comment-cancel-button" onClick={this.toggleFormButton}>Cancel</button>
                            <button className="session-form-button" onClick={this.handleSubmit}>SUBMIT</button>
                        </div>
                    </form>
                }

            </li>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.username]
})

const mapDispatchToProps = dispatch => ({
    updateComment: comment => dispatch(updateComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment);