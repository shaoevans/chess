import React from "react";
import { Link } from "react-router-dom"

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.currentUserSwitch = this.currentUserSwitch.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {
        this.props.logoutUser()
            .then(this.props.history.replace("/login"))
    }

    toggleDropdownClick() { 
        $(function () {
            $('.navbar-user-dropdown').toggleClass('hidden');
        });
    }   

    currentUserSwitch() {
        if (this.props.currentUser) {
            return (
                <div onClick={this.toggleDropdownClick}>
                    {this.props.currentUser.username}
                    <ul className="navbar-user-dropdown hidden">
                        <li>dropdown1</li>
                        <li>dropdown2</li>
                        <li><button onClick={this.logoutUser}>Log Out</button></li>
                    </ul>
                </div>
            )
        } else {
            return <Link to="/login">SIGN IN</Link>
        }
    }

    render() {
        return (
            <nav className="nav-bar">
                <ul className="left-nav">
                    <li>
                        <a href="#">lichess
                            <span>.org</span>
                        </a>
                    </li>
                    <li>
                        <Link to="/"><button>PLAY</button></Link>
                    </li>
                    <li>
                        <Link to="/"><button>LEARN</button></Link>
                    </li>
                    <li>
                        <Link to="/"><button>WATCH</button></Link>
                    </li>
                    <li>
                        <Link to="/"><button>COMMUNITY</button></Link>
                    </li>
                    <li>
                        <Link to="/"><button>TOOLS</button></Link>
                    </li>
                </ul>
                <ul className="right-nav">
                    <li>
                        <button><i className="fas fa-search"></i></button>
                    </li>
                    <li>
                        <button><i className="fas fa-cog"></i></button>
                    </li>
                    <li>
                        {this.currentUserSwitch()}
                    </li>
                </ul>
            </nav>
        )
    }


}
   

export default NavBar;