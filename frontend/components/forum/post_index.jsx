import React from "react";
import PostIndexItem from "./post_index_item";

class PostIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.posts)
        const { posts, forumId } = this.props;
        const now = new Date();
        return (
            <table className="post-index-table" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr className="forum-index-table-header">
                        <th></th>
                        <th>Views</th>
                        <th>Replies</th>
                        <th>Last post</th>
                    </tr>
                    {posts.map((post, i) => {
                        return <PostIndexItem post={post} now={now} forumId={forumId} key={post.id} index={i}/>
                    })}
                </tbody>
            </table>
        )
    }

}

export default PostIndex;

