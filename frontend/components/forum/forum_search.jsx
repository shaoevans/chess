import React from "react";
import debounce from "lodash.debounce";
import queryString from 'query-string';
import { Link } from "react-router-dom";
import ForumSearchItem from "./forum_search_item";


class ForumSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isLoading: false, hasMore: true, searchQuery: "" }
        this.changeSearchQuery = this.changeSearchQuery.bind(this);
        this.handleType = this.handleType.bind(this);
    }

    componentDidMount() {
        this.props.fetchSearchComments(this.grabSearchQuery())
            .then(() => this.setState(this.state))
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.props.fetchSearchComments(this.grabSearchQuery())
                .then(() => this.setState(this.state))
        }
    }

    handleType(e) {
        this.setState({searchQuery: e.currentTarget.value})
    }


    grabSearchQuery() {
        const queryObj = queryString.parse(this.props.location.search)
        let searchQuery;
        if (queryObj.text) {
            searchQuery = queryObj.text
        } else {
            searchQuery = "";
        }
        return searchQuery;
    }

    changeSearchQuery() {
        this.props.history.replace(`/forums/search?text=${this.state.searchQuery}`)
    }

    render() {
        const now = new Date()
        return (
            <div className="forum-search-table">
                <div className="subforum-table-header">
                    <div className="subforum-table-title">
                        <div>
                            <Link to="/forums"><i className="fas fa-angle-left"></i></Link>
                            <span>Search "{this.grabSearchQuery()}"</span>
                        </div>
                        <form onSubmit={this.changeSearchQuery}> 
                            <input className="forum-search-bar" type="text" placeholder="Search" onChange={this.handleType}/>
                        </form>
                    </div>
                    <div className="subforum-table-bar">
                        <span>{this.props.comments.length} results found</span>
                    </div>
                </div>
                <table className="post-index-table" cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <th className="forum-search-th">

                            </th>
                        </tr>
                        {this.props.comments.length ? (
                            this.props.comments.map((comment, i) => {
                                return <ForumSearchItem now={now} comment={comment} key={comment.id} index={i}/>
                            })
                        ) : (
                            <tr>
                                <td>
                                "No results found"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
        
    }
}

export default ForumSearch;