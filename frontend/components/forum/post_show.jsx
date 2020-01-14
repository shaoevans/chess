import React from "react";
import { Link,NavLink } from "react-router-dom";
import Comment from "./comment";
import queryString from "query-string";

class PostShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            postId: this.props.match.params.postId,
            authorId: (this.props.currentUser ? this.props.currentUser.id : null)
        }
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.grabPage = this.grabPage.bind(this);
        this.makeButtons = this.makeButtons.bind(this);
        this.leftButton = this.leftButton.bind(this);
        this.rightButton = this.rightButton.bind(this);
    }



    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postId, this.grabPage())
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.location.search !== this.props.location.search) || (prevProps.match.params.postId !== this.props.match.params.postId) ){
            this.props.fetchPost(this.props.match.params.postId, this.grabPage());
        }
    }
    
    createCommentForm() {
        if (this.props.post.totalPages === this.grabPage()) {
            if (this.props.currentUser) {
                return (
                    <div>
                        <h2>Reply to this topic</h2>
                        <form onSubmit={this.handleSubmit} >
                            <textarea cols="30" rows="6" value={this.state.body} onChange={this.handleType}></textarea>
                            <div id="bottom" className="post-form-buttons">
                                <Link to={`${this.props.location.pathname.slice(0,9)}`}>Cancel</Link>
                                <button className="session-form-button" type="submit"><i className="fas fa-check"></i> Reply</button>
                            </div>
                        </form>
         
                    </div>
                )
            } else {
                return (
                    <div>
                        Log in to reply!
                    </div>
                )
            }
        } else {
            return null;
        }
    }

    handleType(e) {
        this.setState({ body: e.currentTarget.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createComment(this.state)
            .then(() => this.setState({
                body: "",
                postId: this.props.match.params.postId,
                authorId: this.props.currentUser.id
            }))
    }

    grabPage() {
        const queryObj = queryString.parse(this.props.location.search)
        let page;
        if (queryObj.page) {
            page = queryObj.page;
        } else {
            page = 1;
        }
        return parseInt(page);
    }

    makeButtons(page) {
        const buttonsArray = [];
        for (let i = 1; i <= this.props.post.totalPages; i++) {
            buttonsArray.push(i);
        }
        return (
            <div>
                {this.leftButton(page)}
                {buttonsArray.map(i => {
                    return <NavLink activeClassName="active-page-button" to={`${this.props.location.pathname}?page=${i}`} className="page-buttons">{i}</NavLink>

                })}
                {this.rightButton(page)}
            </div>
        )
    }

    leftButton(page) {
        if (page === 1) {
            return (
                <span className="page-buttons" id="gray-button"><i className="fas fa-angle-left"></i></span>
            )
        } else {
            return (
                <Link to={`${this.props.location.pathname}?page=${page-1}`} className="page-buttons"><i className="fas fa-angle-left"></i></Link>
            )
        }
    }

    rightButton(page) {
        if (page === this.props.post.totalPages) {
            return (
                <span className="page-buttons" id="gray-button"><i className="fas fa-angle-right"></i></span>
            )
        } else {
            return (
                <Link to={`${this.props.location.pathname}?page=${page+1}`} className="page-buttons"><i className="fas fa-angle-right"></i></Link>
            )
        }
    }

    render() {
        if (this.props.post) {
            const now = new Date()
            return (
                <div className="post-body">
                    <div className="subforum-table-header">
                        <div className="subforum-table-title">
                            <Link to={`/forums/${this.props.match.params.forumId}`}><i className="fas fa-angle-left"></i></Link>
                            <span> {this.props.post.title}</span>
                        </div>
                        <div className="subforum-table-bar">
                            {this.makeButtons(this.grabPage())}
                            <div></div>
                        </div>
                    </div>
                    <ul className="post-comments">
                        {this.props.comments.map((comment, i) => {
                            return <Comment key={i} now={now} comment={comment} key={comment.id} index={i+1} path={this.props.location.pathname} fetchUser={this.props.fetchUser}/>
                        })}
                    </ul>
                    {this.createCommentForm()}
                    <div className="subforum-table-footer">
                        {this.makeButtons(this.grabPage())}
                    </div>
                </div>
            )
        } else {
            return null;
        }


    }
}

export default PostShow