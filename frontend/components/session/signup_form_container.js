import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { signupUser, clearSessionErrors } from "../../actions/session_actions";

const mapStateToProps = state => ({
    errors: state.errors.session
})
const mapDispatchToProps = dispatch => ({
    signup: formUser => dispatch(signupUser(formUser)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);