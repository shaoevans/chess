import React from "react";
import QuickPairingTableItem from "./quick_pairing_table_item";

const QuickPairingTable = () => (
    (<ul className="quick-pairing-table">
        <QuickPairingTableItem matchTypeNumbers="1+0" matchTypeText="Bullet"/>
        <QuickPairingTableItem matchTypeNumbers="2+1" matchTypeText="Bullet"/>
        <QuickPairingTableItem matchTypeNumbers="3+0" matchTypeText="Blitz"/>
        <QuickPairingTableItem matchTypeNumbers="3+2" matchTypeText="Blitz"/>
        <QuickPairingTableItem matchTypeNumbers="5+0" matchTypeText="Blitz"/>
        <QuickPairingTableItem matchTypeNumbers="5+3" matchTypeText="Blitz"/>
        <QuickPairingTableItem matchTypeNumbers="10+0" matchTypeText="Rapid"/>
        <QuickPairingTableItem matchTypeNumbers="15+15" matchTypeText="Classical"/>
        <QuickPairingTableItem matchTypeNumbers="15+15" matchTypeText="Custom"/>
    </ul>)
)

export default QuickPairingTable;