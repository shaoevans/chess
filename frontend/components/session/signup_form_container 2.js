import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { signupUser } from "../../actions/session_actions";

const mapDispatchToProps = dispatch => ({
    signup: formUser => dispatch(signupUser(formUser))
})

export default connect(null, mapDispatchToProps)(SignupForm);