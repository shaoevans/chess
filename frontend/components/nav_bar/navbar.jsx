import React from "react";
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




    handleSearchType(e) {
        this.setState({
            searchInput: e.currentTarget.value
        })
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutsideType("search"));
        document.addEventListener("mousedown", this.handleClickOutsideType("userDropDown"));
        document.addEventListener("mousedown", this.handleClickOutsideType("battleDropDown"));
        document.addEventListener("mousedown", this.handleClickOutsideType("notificationDropDown"))
        document.addEventListener("mousedown", this.handleClickOutsideType("settingDropDown"))
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
                       <li><button className="navbar-setting-dropdown-button"><span>Language</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button"><span>Sound</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button"><span>Backboard</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button"><span>Board geometry</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button"><span>Board theme</span><i className="fas fa-chevron-right"></i></button></li>
                       <li><button className="navbar-setting-dropdown-button"><span>Piece set</span><i className="fas fa-chevron-right"></i></button></li>
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
            <div className={this.state.battleDropDown ? "white" : ""} onClick={this.handleClickType("battleDropDown")} ref={this.battleDropDown}>
                <button className="right-nav-button"><i className="fas fa-fist-raised"></i></button>
                {this.state.battleDropDown && (
                    <div className="navbar-battle-dropdown">
                        <i className="fas fa-info-circle"></i> No challenges
                    </div>
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
                        <li className="first-child"><button><i className="fas fa-circle"></i>Profile</button></li>
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
                        <a href="#" className="lichess-logo">lichess
                            <span>.org</span>
                        </a>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">PLAY</Link>
                        <ul className="left-nav-dropdown">
                            <li><Link to="/">Create a game</Link></li>
                            <li><Link to="/">Tournaments</Link></li>
                            <li><Link to="/">Simultaneous exhibitions</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">LEARN</Link>
                        <ul className="left-nav-dropdown">
                            <li><Link to="/">Chess basics</Link></li>
                            <li><Link to="/">Puzzles</Link></li>
                            <li><Link to="/">Practice</Link></li>
                            <li><Link to="/">Coordinates</Link></li>
                            <li><Link to="/">Study</Link></li>
                            <li><Link to="/">Coaches</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">WATCH</Link>
                        <ul className="left-nav-dropdown">
                            <li><Link to="/">Lichess TV</Link></li>
                            <li><Link to="/">Current games</Link></li>
                            <li><Link to="/">Streamers</Link></li>
                            <li><Link to="/">Broadcasts</Link></li>
                            <li><Link to="/">Video Libraries</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">COMMUNITY</Link>
                        <ul className="left-nav-dropdown">
                            <li><Link to="/">Players</Link></li>
                            <li><Link to="/">Teams</Link></li>
                            <li><Link to="/forums">Forum</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </li>
                    <li className="left-nav-dropdown-item">
                        <Link className="left-nav-button" to="/">TOOLS</Link>
                        <ul className="left-nav-dropdown">
                            <li><Link to="/">Analysis Board</Link></li>
                            <li><Link to="/">Opening Explorer</Link></li>
                            <li><Link to="/">Board Editor</Link></li>
                            <li><Link to="/">Import Game</Link></li>
                            <li><Link to="/">Advanced Search</Link></li>
                        </ul>
                    </li>
                </ul>
                {this.currentUserSwitch()}

            </nav>
        )
    }


}
   

export default NavBar;