import React from "react";
import LobbyContainer from "./lobby/lobby_container";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import NavBarContainer from "./nav_bar/navbar_container";
import ForumIndexContainer from "./forum/forum_index_container";
import ForumShowContainer from "./forum/forum_show_container";
import PostFormContainer from "./forum/post_form_container.js";
import PostShowContainer from "./forum/post_show_container.js";
import BlogBody from "./blog/blog_body";
import UserShowContainer from "./user/user_show_container";
import ErrorPage from "./errors_page/error_page";
import ChessGame from "./chess_game/chess_game";



const App = () => {
    return (
        <div>
            <Route path="/" component={NavBarContainer} />  
            <Switch>
                <Route path="/errors" component={ErrorPage}/>
                <Route exact path="/forums/:forumId/form" component={PostFormContainer}/>
                <Route exact path="/" component={LobbyContainer} />
                <Route exact path="/forums" component={ForumIndexContainer}/>
                <Route exact path="/forums/:forumId" component={ForumShowContainer}/>
                <Route exact path="/forums/:forumId/posts/:postId" component={PostShowContainer}/>
                <Route path="/chess" component={ChessGame} />
                <Route path="/users/:username" component={UserShowContainer}/>
                <Route path="/blog" component={BlogBody}/>
                <AuthRoute path="/login" component={LoginFormContainer}/>
                <AuthRoute path="/signup" component={SignupFormContainer}/>
                <Redirect to="/errors" />
            </Switch> 
        </div>
    )
}

export default App;