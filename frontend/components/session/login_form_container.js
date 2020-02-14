import { connect } from "react-redux";
import LoginForm from "./login_form";
import { loginUser, clearSessionErrors } from "./../../actions/session_actions";

const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    login: formUser => dispatch(loginUser(formUser)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
