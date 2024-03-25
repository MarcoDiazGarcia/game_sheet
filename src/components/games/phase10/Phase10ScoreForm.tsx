import React from "react";

import './Phase10ScoreForm.css';
import { IonButton, IonButtons, IonSelect, IonSelectOption } from "@ionic/react";

interface Phase10ScoreFormProps {
    setRound: (score: number) => void;
}

const Phase10ScoreForm: React.FC<Phase10ScoreFormProps> = (props) => {
    const { setRound } = props;

    const scoreValues = Array.from({length: 20 + 1}, (_, i) => (i));
    let score = 10;

    return (
        <div className="score-form ion-padding">
            <IonSelect justify="space-between" interface="popover" label='Score' value={score} onIonChange={(e) => score = e.detail.value}>
                {scoreValues.map((sv: number) => <IonSelectOption value={sv} key={'select-score-' + sv}>{sv}</IonSelectOption>)}
            </IonSelect>
            <IonButtons>
                <IonButton color='success' fill="solid" onClick={() => setRound(score)}>Next</IonButton>
            </IonButtons>
        </div>
    );
};

export default Phase10ScoreForm;