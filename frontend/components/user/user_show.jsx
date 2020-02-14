import React from "react";
import { Link, NavLink } from "react-router-dom";
import ChessThumbnail from "../chess_board/chess_thumbnail";
import { dateMaker } from "../../util/date_util";


class UserShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.username)
            .then(() => this.setState(this.state), () => this.props.history.replace("/errors"));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.props.fetchUser(this.props.match.params.username)
                .then(() => this.setState(this.state), () => this.props.history.replace("/errors"));

        }
    }

    render() {
        const { user } = this.props
        const now = new Date();
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
                        <ul className="user-match-index">
                            {this.props.matches.map((match, i) => {
                                const last = new Date(match.updatedAt);
                                const difference = Math.floor((now - last)/(1000*60))
                                return (
                                    <li onClick={() => this.props.history.push(`/matches/${match.id}`)} key={match.id} className={`user-match-index-item ${i % 2 === 0 ? "even-match" : "odd-match"}`}>
                                        <div className="user-match-index-item-chess">
                                            <ChessThumbnail chessMatch={match}/>
                                        </div>
                                        <div className="user-match-index-item-info">
                                            <div className="user-match-index-item-info-header">
                                                <i className="fas fa-snowplow"></i>
                                                <div>
                                                    <span className="user-match-index-item-info-mode">Classical</span>
                                                    <span>{dateMaker(difference)}</span>    
                                                </div>
                                            </div>
                                            <div className="user-match-index-item-battle">
                                                <span>{match.blackPlayerName}</span>
                                                <i className="fas fa-fist-raised"></i>
                                                <span>{match.whitePlayerName}</span>
                                            </div>
                                            <div className="user-match-index-item-movestring">
                                                <span>
                                                    {match.moveString.length > 10 ? `${match.moveString.slice(0, 24)} ...` : match.moveString} {match.moveString.split(" ").length} moves
                                                </span>
                                                    
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
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