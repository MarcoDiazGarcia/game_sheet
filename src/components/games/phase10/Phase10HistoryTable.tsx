import React from "react";

import "./Phase10HistoryTable.css";
import IPhase10Sheet from "../../../entities/interfaces/IPhase10Sheet";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import Phase10Sheet from "../../../entities/classes/Phase10Sheet";

interface Phase10HistoryTableProps {
    history: IPhase10Sheet[];
    editRoundScore: (round: number) => void;
}

const Phase10HistoryTable: React.FC<Phase10HistoryTableProps> = (props) => {
    const { history, editRoundScore } = props;

    const historyArray = history.map((sheet) => new Phase10Sheet({...sheet, history: sheet.history.map((h) => new Phase10Sheet(h))}));

    return (
        <div className="history-table ion-padding">
            <IonGrid>
                <IonRow>
                    <IonCol>Phase</IonCol>
                    <IonCol>Calc</IonCol>
                    <IonCol>Score</IonCol>
                </IonRow>
                {historyArray.reverse().map((sheet, index) => (
                    <IonRow key={'history-row-' + index} onClick={() => editRoundScore(historyArray.length - 1 - index)}>
                        <IonCol>{sheet.phase}</IonCol>
                        <IonCol>{sheet.history.length > 1 ? sheet.history[sheet.history.length - 2].totalScore + ' + ' + sheet.score : ''}</IonCol>
                        <IonCol>{sheet.totalScore}</IonCol>
                    </IonRow>
                ))}
            </IonGrid>

        </div>
    );
};

export default Phase10HistoryTable;