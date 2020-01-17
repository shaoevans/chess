import React from "react";
import ForumIndexItem from "./forum_index_item";
import queryString from 'query-string';


class ForumIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {searchQuery: ""}
        this.changeSearchQuery = this.changeSearchQuery.bind(this);
        this.handleType = this.handleType.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllForums();
    }



    changeSearchQuery() {
        this.props.history.replace(`/forums/search?text=${this.state.searchQuery}`)
    }

    handleType(e) {
        this.setState({searchQuery: e.currentTarget.value})
    }

    render() {
        const { forums } = this.props
        const now = new Date()
        return (

            <div className="forum-table">
                <div className="forum-table-header">
                    <div className="subforum-table-title">
                        <i className="fas fa-comments"></i>
                        <span>Lichess Forum</span>
                    </div>
                    <form onSubmit={this.changeSearchQuery}> 
                        <input className="forum-search-bar" type="text" placeholder="Search" onChange={this.handleType}/>
                    </form>
                </div>
                <table cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr className="forum-index-table-header">
                            <th></th>
                            <th>Topics</th>
                            <th>Posts</th>
                            <th>Last post</th>
                        </tr>
                        {forums.map((forum, i) => {
                            return <ForumIndexItem now={now} key={i} index={i} forum={forum}/>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ForumIndex