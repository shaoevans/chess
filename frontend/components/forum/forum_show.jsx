import React from "react";
import { Link } from "react-router-dom";

class ForumShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchForum(this.props.match.params.forumId);
    }

    render() {
        if (this.props.forum) {
            return (
                <div className="forum-table">
                    <div className="subforum-table-header">
                        <div className="subforum-table-title">
                            <Link to="/forums"><i className="fas fa-angle-left"></i></Link>
                            <span> {this.props.forum.category}</span>
                        </div>
                        <div className="subforum-table-bar">
                            <div>
                                <button><i className="fas fa-angle-left"></i></button>
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>4</button>
                                <button><i className="fas fa-angle-right"></i></button>
                            </div>
                            <Link to={`${this.props.match.params.forumId}/form`}><button className="new-post-button"><i className="fas fa-pencil-alt"></i>CREATE A NEW TOPIC</button></Link>
                        </div>
                    </div>
                    <table cellSpacing="0" cellPadding="0">
                        <tbody>
                            <tr>
                                <th></th>
                                <th>Topics</th>
                                <th>Posts</th>
                                <th>Last post</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return null
        }
    }
}

export default ForumShow;