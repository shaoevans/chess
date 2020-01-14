import React from "react";
import { Link } from "react-router-dom";

class PostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: "",
            authorId: this.props.currentUser.id,
            forumId: this.props.match.params.forumId
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        this.props.fetchForum(this.props.match.params.forumId)
            .then(() => this.setState(this.state));
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
        console.log(this.state)
        this.props.createPost(this.state)
            .then(response => this.props.history.replace(`/forums/${this.props.forum.id}/posts/${response.payload.post.id}`))
    }

    render() {
        if (this.props.forum) {
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
                        <p>Your question may have an answer <a href="https://lichess.org/faq">in the F.A.Q</a></p>
                        {/* <p>Your question may have an answer <Link to="/">in the F.A.Q.</Link></p> */}
                        <p>To report a user for cheating or bad behavior, <a href="https://lichess.org/report">use the report form</a></p>
                        <p>To request user support <a href="https://lichess.org/contact#help-root">try the contact page</a></p>
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
        } else {
            return null;
        }
    }
}

export default PostForm;