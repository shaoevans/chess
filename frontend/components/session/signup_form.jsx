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



    render() {
        return (
            <div className="session-form">
                <h2>Register</h2>
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
                        By registering, you agree to be bound by our Terms of Service.
                    </p>
                    <p className="signup-form-checkbox-container">
                        <input type="checkbox"/> I agree that I will at no time receive assistance during my games 
                        (from a chess computer, book, database or another person).
                    </p>
                    
                    <input type="checkbox"/> I agree that I will always be nice to other players.
                    <br/>
                    <input type="checkbox"/> I agree that I will not create multiple accounts.
                    <br/>
                    <input type="checkbox"/> I agree that I will follow all Lichess policies.
                    <br/>

                    <button className="session-form-button" type="submit">REGISTER</button>
                </form> 
            </div>
        )
    }
}

export default SignupForm