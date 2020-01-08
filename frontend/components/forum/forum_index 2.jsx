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
        console.log(forums)
        return (
            <div className="forum-table">
                <div className="forum-table-title">Lichess Forum</div>
                <table cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Topics</th>
                            <th>Posts</th>
                            <th>Last post</th>
                        </tr>
                        {forums.map((forum, i) => {
                            return <ForumIndexItem key={i} index={i} forum={forum}/>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ForumIndex