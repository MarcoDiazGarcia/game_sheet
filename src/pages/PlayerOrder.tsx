import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonReorder, IonReorderGroup, IonTitle, IonToolbar, ItemReorderEventDetail } from '@ionic/react';

import './PlayerOrder.css'

import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';

import { Player } from '../entities/classes/Player';
import { IPlayer } from '../entities/interfaces/IPlayer';
import IGame from '../entities/interfaces/IGame';
import { caretBack } from 'ionicons/icons';

const PlayerOrder: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const stateData: { players: Player[], game: IGame | null } = location.state ? location.state as { players: Player[], game: IGame | null }: {players: [], game: null};

    const [players, setPlayers] = useState(stateData.players);
    const game: IGame | null = stateData.game;

    function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
        const newPlayers: IPlayer[] = [...players];
        const reorderedPlayer: IPlayer = newPlayers.splice(event.detail.from, 1)[0];
        const newPlayersOrder: IPlayer[] = [...newPlayers.slice(0, event.detail.to), reorderedPlayer, ...newPlayers.slice(event.detail.to)];

        setPlayers(newPlayersOrder);

        event.detail.complete();
    }

    function startGame() {
        history.push('/game/' + game!.route, { players: players });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={caretBack}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Player Order</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Player Order</IonTitle>
                </IonToolbar>
                </IonHeader>
                
                <p className='ion-text-center'>Drag and drop to reorder the playing order!</p>

                <IonList lines='none' inset={true}>
                    <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                        {players.map(player => 
                            <IonReorder key={player.id}>
                                <IonItem>
                                    <IonIcon icon="radio-button-on-outline" style={{color: "#" + player.color}}></IonIcon>
                                    <IonLabel>{player.name}</IonLabel>
                                    <IonReorder slot="end"></IonReorder>
                                </IonItem>
                            </IonReorder>
                        )}
                    </IonReorderGroup>
                </IonList>

                <IonButton className='btn-bottom' onClick={startGame}>Start Game</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default PlayerOrder;