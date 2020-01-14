import React from "react";
import ForumIndexItem from "./forum_index_item";


class ForumIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchAllForums();
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
                    <input className="forum-search-bar" type="text" placeholder="Search"/>
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