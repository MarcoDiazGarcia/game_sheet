import React from "react";

import "./Phase10EditRoundScoreAlert.css";
import { IonAlert } from "@ionic/react";

interface Phase10EditRoundScoreAlertProps {
    score: number;
    round: number;
    show: boolean;
    setShow: (show: boolean) => void;
    setScoreForRound: (score: number, round: number) => void;
    deleteRound: (round: number) => void;
}

const Phase10EditRoundScoreAlert: React.FC<Phase10EditRoundScoreAlertProps> = (props) => {
    const { score, round, show, setShow, setScoreForRound, deleteRound } = props;

    return (
        <IonAlert
            isOpen={show}
            header={"Edit Score For Round " + round}
            subHeader={"Previous score: " + score}
            inputs={[
                {
                  name: 'score',
                  type: 'number',
                  placeholder: score.toString(),
                  min: 0,
                  max: 20,
                },
              ]}
            buttons={[
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    setShow(false);
                  },
                },
                {
                    text: 'Delete',
                    role: 'delete',
                    handler: () => {
                      deleteRound(round);
                      setShow(false);
                    },
                },
                {
                  text: 'OK',
                  role: 'confirm',
                  handler: (data) => {
                    setScoreForRound(Number(data.score), round);
                    setShow(false);
                  },
                },
            ]}
        ></IonAlert>
    );
};

export default Phase10EditRoundScoreAlert;