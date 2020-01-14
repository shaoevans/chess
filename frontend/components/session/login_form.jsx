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
        this.handleDemoUser = this.handleDemoUser.bind(this);
    }

    handleType(type) {
        return (e) => {
            this.setState({
                [type]: e.currentTarget.value
            });
        }
    }

    handleSubmit(e) {
        if (e) {
            e.preventDefault();
        }
        this.props.login(this.state)   
            .then(() => this.props.history.replace("/"))
    }

    handleDemoUser(num) {
        return (e) => {
            if (num === 1) {
                this.setState({
                    username: "Demo User 1",
                    password: "password"
                }, () => setTimeout(this.handleSubmit, 500))
            } else {
                this.setState({
                    username: "Demo User 2",
                    password: "password"
                }, () => setTimeout(this.handleSubmit, 500))
            }
        }
    }

    formInput(type) {
        if (this.state[type] === "") {
            if (type === "password") {
                return <input required className="input-empty" type="password" value={this.state[type]} onChange={this.handleType(type)}/>
            } else {
                if (type === "username") {
                    return <input required autoFocus className="input-empty" type="text" value={this.state[type]} onChange={this.handleType(type)}/>
                } else {
                    return <input required className="input-empty" type="text" value={this.state[type]} onChange={this.handleType(type)}/>
                }
            }
        } else {
            if (type === "password") {
                return <input required type="password" value={this.state[type]} onChange={this.handleType(type)}/>
            } else {
                return <input required type="text" value={this.state[type]} onChange={this.handleType(type)}/>
            }
        }
    }

    errors() {
        if (this.props.errors) {
            return <p className="session-errors">{this.props.errors[0]}</p>
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="session-form">
                <h2>
                    Sign In
                </h2>
                <div className="demo-user-section">
                    <button className="session-form-button" onClick={this.handleDemoUser(1)}>Demo User 1</button>
                    <button className="session-form-button" onClick={this.handleDemoUser(2)}>Demo User 2</button>
                </div>
                {this.errors()}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>User name or email</label>
                        {this.formInput("username")}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        {this.formInput("password")}
                    </div>
                    <button type="submit" className="session-form-button">Sign In</button>
                </form>
                <div className="session-form-options">
                    <Link to="/signup">Register</Link>
                    <Link to="/password/reset">Password reset</Link>
                    <Link to="/auth/magic-link">Log in by email</Link>
                </div>
            </div>
        )
    }
}

export default LoginForm