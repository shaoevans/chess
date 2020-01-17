import React from "react";
import { Link, NavLink } from "react-router-dom";
import PostIndexContainer from "./post_index_container";
import queryString from "query-string";


class ForumShow extends React.Component {
    constructor(props) {
        super(props);
        this.grabPage = this.grabPage.bind(this);
        this.rightButton = this.rightButton.bind(this);
        this.currentUserSwitch = this.currentUserSwitch.bind(this);
        this.state = { page: this.grabPage()}
    }

    componentDidMount() {
        this.props.fetchForum(this.props.match.params.forumId, this.grabPage());
    }
    
    componentDidUpdate(prevProps) {
        if ((prevProps.location.search !== this.props.location.search) || (prevProps.match.params.forumId !== this.props.match.params.forumId) ){
            this.props.fetchForum(this.props.match.params.forumId, this.grabPage());
            this.setState({ page: this.grabPage() });
        }
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

    isSamePage(num) {
        if (this.state.page === num) {
            return "current-page-button"
        } else {
            return "page-buttons"
        }
    }

    makeButtons(page) {
        const { totalPages } = this.props.forum;
        if (page <= 2) {
            return (
                <div>
                    {this.leftButton(page)}
                    <Link to={`${this.props.location.pathname}?page=1`} className={this.isSamePage(1)}>1</Link>
                    <Link to={`${this.props.location.pathname}?page=2`} className={this.isSamePage(2)}>2</Link>
                    <Link to={`${this.props.location.pathname}?page=3`} className={this.isSamePage(3)}>3</Link>
                    <Link to={`${this.props.location.pathname}?page=4`} className={this.isSamePage(4)}>4</Link>
                    <Link to={`${this.props.location.pathname}?page=5`} className={this.isSamePage(5)}>5</Link>
                    {this.rightButton(page)}
                </div>
            )
        } else if (page > totalPages - 2) {
            return (
                <div>
                    {this.leftButton(page)}
                    <Link to={`${this.props.location.pathname}?page=1`} className={this.isSamePage(totalPages-4)}>{totalPages-4}</Link>
                    <Link to={`${this.props.location.pathname}?page=2`} className={this.isSamePage(totalPages-3)}>{totalPages-3}</Link>
                    <Link to={`${this.props.location.pathname}?page=3`} className={this.isSamePage(totalPages-2)}>{totalPages-2}</Link>
                    <Link to={`${this.props.location.pathname}?page=4`} className={this.isSamePage(totalPages-1)}>{totalPages-1}</Link>
                    <Link to={`${this.props.location.pathname}?page=5`} className={this.isSamePage(totalPages)}>{totalPages}</Link>
                    {this.rightButton(page)}
                </div>
            )
        } else {
            return (
                <div>
                    {this.leftButton(page)}
                    <Link to={`${this.props.location.pathname}?page=${page-2}`} className={this.isSamePage(page-2)}>{page-2}</Link>
                    <Link to={`${this.props.location.pathname}?page=${page-1}`} className={this.isSamePage(page-1)}>{page-1}</Link>
                    <Link to={`${this.props.location.pathname}?page=1`} className={this.isSamePage(page)}>{page}</Link>
                    <Link to={`${this.props.location.pathname}?page=${page+1}`} className={this.isSamePage(page+1)}>{page+1}</Link>
                    <Link to={`${this.props.location.pathname}?page=${page+2}`} className={this.isSamePage(page+2)}>{page+2}</Link>
                    {this.rightButton(page)}
                </div>
            )
        }
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
        if (page === this.props.forum.totalPages) {
            return (
                <span className="page-buttons" id="gray-button"><i className="fas fa-angle-right"></i></span>
            )
        } else {
            return (
                <Link to={`${this.props.location.pathname}?page=${page+1}`} className="page-buttons"><i className="fas fa-angle-right"></i></Link>
            )
        }
    }

    currentUserSwitch() {
        if (this.props.loggedIn) {
            return <Link to={`${this.props.match.params.forumId}/form`}><button className="new-post-button"><i className="fas fa-pencil-alt"></i> CREATE A NEW TOPIC</button></Link>
        } else {
            return <div></div>
        }

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
                            {this.makeButtons(this.grabPage())}
                            {this.currentUserSwitch()}
                        </div>
                    </div>
                    < PostIndexContainer forumId={this.props.match.params.forumId}/> 
                    <div className="subforum-table-footer">
                        {this.makeButtons(this.grabPage())}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}

export default ForumShow;