import React from "react";
import { Link } from "react-router-dom";

class PostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: "",
            authorId: this.props.currentUser.id,
            forumId: this.props.forum.id
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.back = this.back.bind(this);
    }

    back() {
        this.props.history.replace(`/forums/${this.props.forum.id}`)
    }

    typeChange(type) {
        return (e) => {
            this.setState({
                [type]: e.currentTarget.value
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("SUBMIT", this.state)
        this.props.createPost(this.state)
            .then(console.log("success"))
    }

    render() {
        return (
            <div className="post-form-body">
                <div className="subforum-table-header">
                    <div className="subforum-table-title">
                        <Link to={`/forums/${this.props.forum.id}`}><i className="fas fa-angle-left"></i></Link>
                        <span> {this.props.forum.category}</span>
                    </div>
                </div>
                <div className="post-form-errors">
                    <h2><i className="fas fa-exclamation-triangle"></i> Important</h2>
                    <p>Your question may have an answer <Link to="/">in the F.A.Q.</Link></p>
                    <p>To report a user for cheating or bad behavior, <Link to="/">use the report form</Link></p>
                    <p>To request user support <Link to="/">try the contact page</Link></p>
                </div>
                <form>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" value={this.state.title} onChange={this.typeChange("title")} autoFocus/>
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea cols="30" rows="10" width="100%" value={this.state.body} onChange={this.typeChange("body")}></textarea>
                    </div>
                </form>
                <div className="post-form-buttons">
                    <Link to={`/forums/${this.props.forum.id}`}>Cancel</Link>
                    <button className="session-form-button"onClick={this.handleSubmit}><i className="fas fa-check"></i> Create The Topic</button>
                </div>
            </div>
        )
    }
}

export default PostForm;