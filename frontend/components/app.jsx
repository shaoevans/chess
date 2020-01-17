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
import ChessBoard from "./chess_board/chess_board";
import CreateGameForm from "./modal/create_game_form";
import ChallengeFriendForm from "./modal/challenge_friend_form";
import Modal from "./modal/modal";
import ForumSearchContainer from "./forum/forum_search_container";
import ChessBoardContainer from "./chess_board/chess_board_container";



const App = () => {
    return (
        <div>
            <Modal />
            <Route path="/" component={NavBarContainer} />  
            <Switch>
                <Route path="/test" component={ChallengeFriendForm} />
                <Route path="/errors" component={ErrorPage}/>
                <Route exact path="/forums/:forumId/form" component={PostFormContainer}/>
                <Route exact path="/" component={LobbyContainer} />
                <Route exact path="/forums" component={ForumIndexContainer}/>
                <Route exact path="/forums/search" component={ForumSearchContainer}/>
                <Route exact path="/forums/:forumId" component={ForumShowContainer}/>
                <Route exact path="/forums/:forumId/posts/:postId" component={PostShowContainer}/>
                <Route path="/matches/:matchId" component={ChessBoardContainer} />
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