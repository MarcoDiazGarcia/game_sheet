import React from "react";

import './Phase10EndScreenModal.css';

import IPhase10Game from "../../../entities/interfaces/IPhase10Game";
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import Phase10EndscreenPlayer from "./Phase10EndScreenPlayer";
import IPhase10Sheet from "../../../entities/interfaces/IPhase10Sheet";
import Phase10Sheet from "../../../entities/classes/Phase10Sheet";
import { IPlayer } from "../../../entities/interfaces/IPlayer";

interface Phase10EndScreenModalProps {
    show: boolean;
    game: IPhase10Game;
    dispatch: (action: any) => void;
}

const Phase10EndScreenModal: React.FC<Phase10EndScreenModalProps> = (props) => {
    const { show, game, dispatch } = props;

    let playersByScore: IPlayer[] = [];
    const sheets: Map<number, IPhase10Sheet> = new Map<number, IPhase10Sheet>();

    if (show) {
        game.sheets.forEach((sheet: IPhase10Sheet, key: number) => sheets.set(key, new Phase10Sheet(sheet)));
    
        playersByScore = game.players.sort((a, b) => {
            return (sheets.get(a.id)!.totalScore - sheets.get(a.id)!.phase * 100) - (sheets.get(b.id)!.totalScore - sheets.get(b.id)!.phase * 100);
        });
    }

    return (
        <IonModal isOpen={show} className="phase10-endscreen-modal">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Game Over</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {playersByScore.map((player, i) => <Phase10EndscreenPlayer key={player.id} player={player} place={i+1} score={sheets.get(player.id)!.totalScore} phase={sheets.get(player.id)!.phase > 10 ? sheets.get(player.id)!.phase - 1 : sheets.get(player.id)!.phase}></Phase10EndscreenPlayer>)}
            </IonContent>
            <IonFooter>
                <IonToolbar>
                <IonButtons slot='start' className='ion-margin'>
                    <IonButton color='danger' fill='solid' onClick={() => dispatch({type: 'end'})}>End</IonButton>
                </IonButtons>
                <IonButtons slot='end' className='ion-margin'>
                    <IonButton color='success' fill='solid' onClick={() => dispatch({type: 'restart'})}>Restart</IonButton>
                </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonModal>
    );
};

export default Phase10EndScreenModal;