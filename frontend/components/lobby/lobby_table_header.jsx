import React from "react";
import { Link } from "react-router-dom";

const LobbyTableHeader = ({title, url, icon}) => (
    <div className="lobby-table-header">
        <span><i className={`fas fa-${icon}`}></i>{title}</span>
        <Link to={url}>More »</Link>
    </div>
)

export default LobbyTableHeader