import React from "react";
import { Link, NavLink } from "react-router-dom";


class UserShow extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {}
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.username)
            // .then(() => console.log("SLDKFJSLKDJF"))
            // .then(() => this.setState({}))
    }

    render() {
        const { user } = this.props
        if (user) {
            return (
                <div className="user-body-container">
                    <nav className="user-navbar">
                        <NavLink activeClassName="active" to={`/users/${user.username}/bullet`}>
                            <i className="fas fa-bolt"></i>
                            <div className="user-navbar-content">
                                <span>Bullet</span>
                                <span>1000</span>
                            </div>
                            <i className="fas fa-caret-right"></i>
                        </NavLink>
                        <NavLink activeClassName="active" to={`/users/${user.username}/blitz`}>
                            <i className="fas fa-fire"></i>
                            <div className="user-navbar-content">
                                <span>Blitz</span>
                                <span>1000</span>
                            </div>
                            <i className="fas fa-caret-right"></i>
                        </NavLink>
                        <NavLink activeClassName="active" to={`/users/${user.username}/rapid`}>
                            <i className="fas fa-frog"></i>
                            <div className="user-navbar-content">
                                <span>Rapid</span>
                                <span>1000</span>
                            </div>
                            <i className="fas fa-caret-right"></i>
                        </NavLink>
                        <NavLink activeClassName="active" to={`/users/${user.username}/classical`}>
                            <i className="fas fa-snowplow"></i>
                            <div className="user-navbar-content">
                                <span>Classical</span>
                                <span>1000</span>
                            </div>
                            <i className="fas fa-caret-right"></i>
                        </NavLink>
                        <NavLink activeClassName="active" to={`/users/${user.username}/correspondance`}>
                            <i className="fas fa-paper-plane"></i>
                            <div className="user-navbar-content">
                                <span>Correspondance</span>
                                <span>1000</span>
                            </div>
                            <i className="fas fa-caret-right"></i>
                        </NavLink>
    
                        <NavLink activeClassName="active" to={`/users/${user.username}/training`}>
                            <i className="fas fa-bullseye"></i>
                            <div className="user-navbar-content">
                                <span>Training</span>
                                <span>1000</span>
                            </div>
                            <i className="fas fa-caret-right"></i>
                        </NavLink>
                    </nav>
                    <div className="user-body">
                        <div className="user-body-header">
                            <div className="user-body-content">
                                {user.username}
                            </div>
                            <Link className="games-link-button" to="/"><i className="fas fa-fire"></i> VIEW THE GAMES</Link>
                        </div>
                    </div>
                    {/* <Switch> */}
                        {/* <Route path="/blog/:blogYear/:blogId"  component={}/> */}
                        {/* <Route path="/blog/:blogYear" component={BlogYearIndexContainer} /> */}
                        {/* <Route path={`/users/${user.username}`} component={}/> */}
                    {/* </Switch> */}
                </div>
            )
        } else {
            return null;
        }
    }
}

export default UserShow;