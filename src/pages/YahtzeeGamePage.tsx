import './YahtzeeGamePage.css';

import { useState } from 'react';
import { useLocation } from 'react-router';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,  } from '@ionic/react';

import { IPlayer } from '../entities/interfaces/IPlayer';
import { YahtzeeGame } from '../entities/classes/YahtzeeGame';

const YahtzeeGamePage: React.FC = () => {
    const location = useLocation();
    const historyState: { players: IPlayer[] } = location.state as { players: IPlayer[] };
    const [yahtzeeGame, setYahtzeeGame] = useState(new YahtzeeGame(historyState.players));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Yahtzee | </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Yahtzee</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <h1>Yahtzee Game</h1>
                <p>Players: {JSON.stringify(location.state)}</p>
            </IonContent>
        </IonPage>
    );
};

export default YahtzeeGamePage;