import React from "react";

import "./Phase10SheetComp.css";

import IPhase10Sheet from "../../../entities/interfaces/IPhase10Sheet";
import Phase10ScoreForm from "./Phase10ScoreForm";
import Phase10HistoryTable from "./Phase10HistoryTable";

interface Phase10SheetProps {
    color: string;
    sheet: IPhase10Sheet;
    setRound: (score: number) => void;
    editRoundScore: (round: number) => void;
}

const Phase10SheetComp: React.FC<Phase10SheetProps> = (props) => {
    const { color, sheet, setRound, editRoundScore } = props;

    return (
        <div className="sheet ion-margin ion-padding" style={{backgroundColor: '#' + color}}>
            <div className="round">
                Round {sheet?.history.length}
            </div>
            <Phase10ScoreForm setRound={setRound}></Phase10ScoreForm>
            <Phase10HistoryTable history={sheet?.history} editRoundScore={editRoundScore}></Phase10HistoryTable>
        </div>
    );
};

export default Phase10SheetComp;
    