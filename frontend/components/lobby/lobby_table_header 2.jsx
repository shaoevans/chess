import React from "react";

const LobbyTableHeader = ({title}) => (
    <div className="lobby-table-header">
        <span><i className="fas fa-crown"></i>{title}</span>
        <a href="#">More »</a>
    </div>
)

export default LobbyTableHeader