import React from "react";
import Lobby from "./lobby/lobby";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./../util/route_util";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import NavBarContainer from "./nav_bar/navbar_container";
import ForumIndexContainer from "./forum/forum_index_container";
import ForumShowContainer from "./forum/forum_show_container";
import PostFormContainer from "./forum/post_form_container.js";


const App = () => {
    return (
        <div>
            <Route path="/" component={NavBarContainer} />   
            <Route exact path="/forums/:forumId/form" component={PostFormContainer}/>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/forums" component={ForumIndexContainer}/>
            <Route exact path="/forums/:forumId" component={ForumShowContainer}/>
            <AuthRoute path="/login" component={LoginFormContainer}/>
            <AuthRoute path="/signup" component={SignupFormContainer}/>
        </div>
    )
}

export default App;