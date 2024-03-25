import React from "react";

import './Phase10OverviewModal.css';

import IPhase10Game from "../../../entities/interfaces/IPhase10Game";

import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import Phase10Sheet from "../../../entities/classes/Phase10Sheet";

interface Phase10OverviewModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    game: IPhase10Game;
}

const Phase10OverviewModal: React.FC<Phase10OverviewModalProps> = (props) => {
    const { show, setShow, game } = props;

    return (
        <IonModal isOpen={show}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Phase10 Overview
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="danger" onClick={() => setShow(false)}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="overview ion-margin ion-padding">
                    <div className="round-info ion-margin ion-padding">
                        <div className="round">
                            Round {game.round}
                        </div>
                        <div className="dealer">
                            <div className="title">
                                Dealer:
                            </div>
                            <div className="name" style={{borderColor: '#' + game.dealer.color}}>
                                {game.dealer.name}
                            </div>                               
                        </div>
                    </div>
                    {game.players.map((player, index) => {
                        return (
                            <div key={'overview-player-' + index} className="player" style={{borderColor: '#' + player.color}}>
                                <div className="phase" style={{borderColor: '#' + player.color}}>{game.sheets.get(player.id)!.phase}</div>
                                <div className="name">{player.name}</div>
                                <div className="score" style={{borderColor: '#' + player.color}}>{new Phase10Sheet(game.sheets.get(player.id)!).totalScore}</div>
                            </div>
                        );
                    })}
                </div>
            </IonContent>
        </IonModal>
    );
};

export default Phase10OverviewModal;