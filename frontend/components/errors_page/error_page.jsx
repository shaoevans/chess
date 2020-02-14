import React from "react";
import { Link } from "react-router-dom";
// import init from "./src/game";
class ErrorPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // init();
        // const script = document.createElement("script");
        // script.src = "/Users/evansshao/Desktop/chess/frontend/components/errors_page/src/game.js"
        // script.async = true;
        // document.body.appendChild(script);
    }

    render() {
        return (
            <div className="errors-body">
                <div className="errors-header">
                    <div className="errors-header-left">
                        404
                    </div>
                    <div className="errors-header-right">
                        <span className="errors-header-error">PAGE NOT FOUND!</span>
                        <span className="errors-header-info">
                            <p>Return to <Link to="/">the homepage </Link></p> 
                        </span>
                    </div>
                </div>
                <div id="game">
    
                </div>
            </div>
        )
    }
}


export default ErrorPage;