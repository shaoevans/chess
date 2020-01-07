import React from "react";
import QuickPairingTable from "./quick_pairing_table";

const LichessBackground = () => (
    <div className="lichess-background-container">
        <div className="lichess-background-nav">
            <span>Quick Pairing</span>
            <span>Lobby</span>
            <span>Correspondance</span>
            </div>
        <div className="lichess-background">
            <QuickPairingTable />
        </div>
    </div>

)

export default LichessBackground;