import React from "react";

const QuickPairingTableItem = ({matchTypeNumbers, matchTypeText}) => (
    <li className="quick-pairing-table-item">
        <div className="match-type-number">{matchTypeNumbers}</div>
        <div className="match-type-text">{matchTypeText}</div>
    </li>
)

export default QuickPairingTableItem;