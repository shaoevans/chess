import React from "react";

const LobbySide = () => {
    return (
        <div className="lobby-side">
            <a target="_blank" className="lobby-side-item" href="https://www.linkedin.com/in/evans-shao-b76201139/">
                <i class="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>    
            </a>
            <a target="_blank" className="lobby-side-item" href="https://github.com/shaoevans">
                <i class="fab fa-github"></i>
                <span>Github</span> 
            </a>
            <a target="_blank" className="lobby-side-item" href="https://angel.co/evans-shao">
                <i class="fab fa-angellist"></i>
                <span>AngelList</span> 
            </a>
            <div className="lobby-side-info">
                Evanschess is a free (really), libre, no-ads, individually produced clone of 
                <a target="_blank" href="http://www.lichess.org"> lichess.org </a>
            </div>
        </div>
    )
}



export default LobbySide;