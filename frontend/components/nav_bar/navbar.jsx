import React from "react";
import ChessThumbnail from "../chess_board/chess_thumbnail";
import { Link } from "react-router-dom"

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.userDropDown = React.createRef();
        this.search = React.createRef();
        this.battleDropDown = React.createRef();
        this.notificationDropDown = React.createRef();
        this.settingDropDown = React.createRef()
        this.state = { 
            userDropDown: false, 
            search: false, 
            searchInput: "",
            notificationDropDown: false,
            battleDropDown: false,
            settingDropDown: false, 
        }
        this.currentUserLoginSwitch = this.currentUserLoginSwitch.bind(this);
        this.handleSearchType = this.handleSearchType.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.searchBarSubmit = this.searchBarSubmit.bind(this);
        this.userDropDownSwitch = this.userDropDownSwitch.bind(this);
        this.handleClickType = this.handleClickType.bind(this);
        this.handleClickOutsideType = this.handleClickOutsideType.bind(this);
        this.bringToUserPage = this.bringToUserPage.bind(this);
        this.ensureLoggedIn = this.ensureLoggedIn.bind(this);
    }

    logoutUser() {
        this.props.logoutUser()
            .then(this.props.history.replace("/login"))
    }

    handleClickType(type) {
        return () => {
            this.setState({ [type]: !this.state[type] })
        }
    }

    ensureLoggedIn() {
        if (this.props.currentUser) {
            this.props.createGameModal()
        } else {
            this.props.history.push("/login")
        }
    }




    handleSearchType(e) {
        this.setState({
            searchInput: e.currentTarget.value
        })
    }

    componentDidMount() {
        if (this.props.currentUser) {
            this.props.fetchUserCurrentMatches(this.props.currentUser.id)
        }
        document.addEventListener("mousedown", this.handleClickOutsideType("search"));
        document.addEventListener("mousedown", this.handleClickOutsideType("userDropDown"));
        document.addEventListener("mousedown", this.handleClickOutsideType("battleDropDown"));
        document.addEventListener("mousedown", this.handleClickOutsideType("notificationDropDown"))
        document.addEventListener("mousedown", this.handleClickOutsideType("settingDropDown"))
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser !== prevProps.currentUser) {
            if (this.props.currentUser) {
                this.props.fetchUserCurrentMatches(this.props.currentUser.id)
            }
        }
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutsideType("search"));
        document.removeEventListener("mousedown", this.handleClickOutsideSearchType("userDropDown"));
        document.removeEventListener("mousedown", this.handleClickOutsideSearchType("battleDropDown"));
        document.removeEventListener("mousedown", this.handleClickOutsideSearchType("notificationDropDown"));
        document.removeEventListener("mousedown", this.handleClickOutsideSearchType("settingDropDown"));
    }

    handleClickOutsideType(type) {
        return (e) => {
            if (this[type].current && !this[type].current.contains(e.target)) {
                this.setState({
                    [type]: false
                })
            }
        }
    }




    searchBarSubmit(event) {
        event.preventDefault();
        this.props.history.replace(`/users/${this.state.searchInput}`)
        this.setState({search: false, searchInput: "d"})
    }


    bringToMatchPage(matchId) {
        return (e) => {
            e.preventDefault();
            this.props.history.replace(`/matches/${matchId}`)
        }
    }
    bringToUserPage(e) {
        e.preventDefault();
        this.props.history.replace(`/users/${this.props.currentUser.username}`)
    }

    currentUserLoginSwitch() {
        if (this.props.currentUser) {
            return (
                <div onClick={this.handleClickType("userDropDown")} ref={this.userDropDown}>
                    <button className="right-nav-button">{this.props.currentUser.username}</button>
                    {this.state.userDropDown && (
                        <ul className="navbar-user-dropdown">
                            <li className="first-child"><button><i className="fas fa-circle"></i>Profile</button></li>
                            <li><button><i className="fas fa-envelope"></i>Inbox</button></li>
                            <li><button><i className="fas fa-cog"></i>Preferences</button></li>
                            <li><button onClick={this.logoutUser}><i className="fas fa-power-off"></i> Sign Out</button></li>
                        </ul>
                    )}
                </div>
            )
        } else {
            return <Link to="/login">SIGN IN</Link>
        }
    }

    matchesToListItems() {
        return this.props.matches.map(match => {
            // return <li className="match-link" key={match.id}><Link to={`/matches/${match.id}`}>Match {match.id} against {match.blackPlayerName}</Link></li>
            return  <li className="match-link" key={match.id} onClick={this.bringToMatchPage(match.id)}>
                        <button>
                                Match {match.id} against {match.blackPlayerName === this.props.currentUser.username ? match.whitePlayerName : match.blackPlayerName}
                        </button>
                    </li>
       })
    }
    currentUserSwitch() {
        return (
            <ul className="right-nav">
                <li>
                    {this.searchSwitch()}
                </li>
                {this.props.currentUser && <li>{this.battleDropDownSwitch()}</li>}
                {this.props.currentUser && <li>{this.notificationDropDownSwitch()}</li> || <li>{this.settingDropDownSwitch()}</li>}
                {this.props.currentUser && <li>{this.userDropDownSwitch()}</li> || <li><Link to="/login">SIGN IN</Link></li>}
            </ul>
        )
    }

    settingDropDownSwitch() {
        return (
            <div className={this.state.settingDropDown ? "white" : ""} onClick={this.handleClickType("settingDropDown")} ref={this.settingDropDown}>
                <button className="right-nav-button"><i className="fas fa-cog"></i></button>
                {this.state.settingDropDown && (
                    <ul className="navbar-setting-dropdown">
                       <li><button className="navbar-setting-dropdown-button disabled-nav"><span>Language</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button disabled-nav"><span>Sound</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button disabled-nav"><span>Backboard</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button disabled-nav"><span>Board geometry</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button disabled-nav"><span>Board theme</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button disabled-nav"><span>Piece set</span><i className="fas fa-chevron-right"></i></button></li>
                       <li className="navbar-setting-dropdown-ping">
                           <div>
                               <p>PING <span>169</span> ms</p>
                               <p>SERVER <span>?</span> ms</p>
                           </div>
                            
                            <i className="fas fa-signal"></i>
                       </li>
                    </ul>

                )}
            </div>
        )
    }

    battleDropDownSwitch() {
        return (
            <div className={this.state.battleDropDown ? "white battle-dropdown" : "battle-dropdown"} onClick={this.handleClickType("battleDropDown")} ref={this.battleDropDown}>
                <button className="right-nav-button"><i className="fas fa-fist-raised"></i></button>
                {this.props.matches.length && (
                    <span className="battles-count">{this.props.matches.length ? this.props.matches.length : null}</span>
                )}
                {this.state.battleDropDown && (
                    <ul className="navbar-battle-dropdown">
                        {!this.props.matches.length ? (
                            <li><i className="fas fa-info-circle"></i> No challenges</li>
                        ) : this.matchesToListItems()}
                    </ul>
                )}
            </div>
        )
    }

    notificationDropDownSwitch() {
        return (
            <div className={this.state.notificationDropDown ? "white" : ""} onClick={this.handleClickType("notificationDropDown")} ref={this.notificationDropDown}>
                <button className="right-nav-button"><i className="far fa-bell-slash"></i></button>
                {this.state.notificationDropDown && (
                    <div className="navbar-battle-dropdown">
                        <i className="fas fa-info-circle"></i> No notifications
                    </div>
                )}
            </div>
        )
    }


    userDropDownSwitch() {
        return (
            <div className={this.state.userDropDown ? "white" : ""} onClick={this.handleClickType("userDropDown")} ref={this.userDropDown}>
                <button className="right-nav-button right-nav-user">{this.props.currentUser.username}</button>
                {this.state.userDropDown && (
                    <ul className="navbar-user-dropdown">
                        <li className="first-child"><button onClick={this.bringToUserPage}><i className="fas fa-circle"></i>Profile</button></li>
                        <li><button><i className="fas fa-envelope"></i>Inbox</button></li>
                        <li><button><i className="fas fa-cog"></i>Preferences</button></li>
                        <li><button className="last-child" onClick={this.logoutUser}><i className="fas fa-power-off"></i> Sign Out</button></li>
                    </ul>
                )}
            </div>
        )
    }



    

    searchSwitch() {
        return (
            <div className="right-nav-search" onClick={this.handleClickType("search")}>
                <button className="right-nav-button"><i className="fas fa-search"></i></button>
                {this.state.search && (
                    <span>
                        <form onSubmit={this.searchBarSubmit}>
                            <input ref={this.search} autoFocus type="text" value={this.state.searchInput} onChange={this.handleSearchType} placeholder="Search"/>
                        </form>
                    </span>
                )}
            </div>
        )
    }

    render() {
        return (
            <nav className="nav-bar">
                <ul className="left-nav">
                        <a href="#" className="lichess-logo">evanschess
                            <span>.org</span>
                        </a>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">PLAY</Link>
                        <ul className="left-nav-dropdown">
                            <li onClick={this.ensureLoggedIn}><Link to="/">Create a game</Link></li>
                            <li className="disabled-nav"><Link to="/">Tournaments</Link></li>
                            <li className="disabled-nav"><Link to="/">Simultaneous exhibitions</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">LEARN</Link>
                        <ul className="left-nav-dropdown">
                            <li className="disabled-nav"><Link to="/">Chess basics</Link></li>
                            <li className="disabled-nav"><Link to="/">Puzzles</Link></li>
                            <li className="disabled-nav"><Link to="/">Practice</Link></li>
                            <li className="disabled-nav"><Link to="/">Coordinates</Link></li>
                            <li className="disabled-nav"><Link to="/">Study</Link></li>
                            <li className="disabled-nav"><Link to="/">Coaches</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">WATCH</Link>
                        <ul className="left-nav-dropdown">
                            <li className="disabled-nav"><Link to="/">Lichess TV</Link></li>
                            <li className="disabled-nav"><Link to="/">Current games</Link></li>
                            <li className="disabled-nav"><Link to="/">Streamers</Link></li>
                            <li className="disabled-nav"><Link to="/">Broadcasts</Link></li>
                            <li className="disabled-nav"><Link to="/">Video Libraries</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">COMMUNITY</Link>
                        <ul className="left-nav-dropdown">
                            <li className="disabled-nav"><Link to="/">Players</Link></li>
                            <li className="disabled-nav"><Link to="/">Teams</Link></li>
                            <li><Link to="/forums">Forum</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">TOOLS</Link>
                        <ul className="left-nav-dropdown">
                            <li className="disabled-nav"><Link to="/">Analysis Board</Link></li>
                            <li className="disabled-nav"><Link to="/">Opening Explorer</Link></li>
                            <li className="disabled-nav"><Link to="/">Board Editor</Link></li>
                            <li className="disabled-nav"><Link to="/">Import Game</Link></li>
                            <li className="disabled-nav"><Link to="/">Advanced Search</Link></li>
                        </ul>
                    </li>
                </ul>
                {this.currentUserSwitch()}

            </nav>
        )
    }


}
   

export default NavBar;