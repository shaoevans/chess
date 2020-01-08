import React from "react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleType(type) {
        return (e) => {
            this.setState({
                [type]: e.currentTarget.value
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)   
            .then(() => this.props.history.replace("/"))

    }

    render() {
        return (
            <div className="session-form">
                <h2>Sign In</h2>
                <form>
                    <label>User name or email
                        <input type="text" value={this.state.username} onChange={this.handleType("username")}/>
                    </label>
                    <label>Password
                        <input type="password" value={this.state.password} onChange={this.handleType("password")}/>
                    </label>
                    <button className="session-form-button" onClick={this.handleSubmit}>Sign In</button>
                </form>
                <ul className="session-form-options">
                    <li>
                        <Link to="/signup">Register</Link>
                        <Link to="/password/reset">Password reset</Link>
                        <Link to="/auth/magic-link">Log in by email</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default LoginForm