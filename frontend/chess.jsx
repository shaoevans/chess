import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import Board from "./checkers_backend/board";
import AIPlayer from "./chess_backend/ai_player";

document.addEventListener("DOMContentLoaded", () => {
    let store;

    if (window.currentUser) {
        const preloadedState = {
          entities: {
            users: { [window.currentUser.username]: window.currentUser }
          },
          session: { username: window.currentUser.username }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    window.Board = new Board();
    window.getState = store.getState;

    let oldRoot = document.getElementById("root")
    ReactDOM.render(<Root store={store}/> , oldRoot)
})