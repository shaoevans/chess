import { connect } from "react-redux";
import PostIndex from "./post_index";


const mapStateToProps = (state, ownProps) => {
    return {
        posts: Object.values(state.entities.posts)
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex)