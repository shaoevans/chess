import React from "react";
import QuickPairingTable from "./quick_pairing_table";

const LichessBackground = () => (
    <div className="lobby-app">
        <div className="lichess-background-nav">
            <span className="active-lichess-nav">Quick Pairing</span>
            <span>Lobby</span>
            <span>Correspondance</span>
            </div>
        <div className="lichess-background">
            <QuickPairingTable />
        </div>
    </div>

)

export default LichessBackground;