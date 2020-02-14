import React from "react";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInput = this.formInput.bind(this);
    }

    handleType(type) {
        return (e) => {
            this.setState({
                [type]: e.currentTarget.value
            });
        }
    }

    errors() {
        if (this.props.errors) {
            return (
                <ul>
                    {this.props.errors.map(error => {
                        return <li className="session-errors">{error}</li>
                    })}
                </ul>
            )
        } else {
            return null;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state)   
            .then(() => this.props.history.replace("/"))
    }

    formInput(type) {
        if (this.state[type] === "") {
            if (type === "password") {
                return <input className="input-empty" type="password" value={this.state[type]} onChange={this.handleType(type)}/>
            } else {
                if (type === "username") {
                    return <input required autoFocus className="input-empty" type="text" value={this.state[type]} onChange={this.handleType(type)}/>
                } else {
                    return <input required className="input-empty" type="text" value={this.state[type]} onChange={this.handleType(type)}/>
                }
            }
        } else {
            if (type === "password") {
                return <input type="password" value={this.state[type]} onChange={this.handleType(type)}/>
            } else {
                return <input type="text" value={this.state[type]} onChange={this.handleType(type)}/>
            }
        }
    }

    componentWillUnmount() {
        this.props.clearSessionErrors();
    }

    render() {
        return (
            <div className="session-form">
                <h2>Register</h2>
                {this.errors()}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>User name</label>
                        {this.formInput("username")}
                    </div>
                    <div className="form-group">
                        <label>Password</label> 
                        {this.formInput("password")}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        {this.formInput("email")}
                    </div>
                    <p>
                        <i className="fas fa-info-circle"></i>
                         Computers and computer-assisted players are not allowed to play. 
                        Please do not get assistance from chess engines, databases, or 
                        from other players while playing. Also note that making multiple accounts is 
                        strongly discouraged and excessive multi-accounting will lead to being banned.
                        <span>
                            By registering, you agree to be bound by our <a href="https://lichess.org/terms-of-service">Terms of Service.</a> 
                        </span>
                    </p>
                    <div className="signup-form-input-group">
                        <div className="pretty p-switch p-fill">
                            <input type="checkbox" required/>
                            <div className="state p-success">
                                <label></label>
                            </div>
                        </div>
                        <span>
                        I agree that I will at no time receive assistance during my games 
                        (from a chess computer, book, database or another person).
                        </span>
                    </div>
                    <div className="signup-form-input-group">
                        <div className="pretty p-switch p-fill">
                            <input type="checkbox"  required/>
                            <div className="state p-success">
                                <label></label>
                            </div>
                        </div>
                        <span>
                            I agree that I will always be nice to other players.
                        </span>
                    </div>
                    <div className="signup-form-input-group">
                        <div className="pretty p-switch p-fill">
                            <input type="checkbox" required/>
                            <div className="state p-success">
                                <label></label>
                            </div>
                        </div>
                        <span>
                            I agree that I will not create multiple accounts.
                        </span>
                    </div>
                    <div className="signup-form-input-group">
                        <div className="pretty p-switch p-fill">
                            <input type="checkbox" required/>
                            <div className="state p-success">
                                <label></label>
                            </div>
                        </div>
                        <span>
                            I agree that I will follow all Lichess policies.
                        </span>
                    </div>
                    <button className="session-form-button" type="submit">REGISTER</button>
                </form> 
            </div>
        )
    }
}

export default SignupForm