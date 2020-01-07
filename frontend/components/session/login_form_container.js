import { connect } from "react-redux";
import LoginForm from "./login_form";
import { loginUser } from "./../../actions/session_actions";

const mapDispatchToProps = dispatch => ({
    login: formUser => dispatch(loginUser(formUser))
})


export default connect(null, mapDispatchToProps)(LoginForm)
