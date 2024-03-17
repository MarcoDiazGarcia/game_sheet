import './SelectGameModal.css'

import IGame from '../../entities/interfaces/IGame';

import { loadGames } from '../../data/data';

import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react';

interface SelectGameModalProps {
    show: boolean;
    selectGame: (game: IGame) => void;
    close: () => void;
}

const SelectGameModal: React.FC<SelectGameModalProps> = (props) => {
    const { show, selectGame, close } = props;

    const games: IGame[] = loadGames();

    return (
        <IonModal isOpen={show}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Choose game</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton color='danger' onClick={close}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonGrid>
                <IonRow>
                    {games.map((game) => 
                        <IonCol key={game.id} size='6' sizeMd='4' sizeLg='2'>
                            <IonCard onClick={() => selectGame(game)}>
                                <img alt={game.name + ' Logo'} src={game.image} />
                                <IonCardHeader>
                                    <IonCardTitle>{game.name}</IonCardTitle>
                                    <IonCardSubtitle>{game.minPlayers} - {game.maxPlayers} Players</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    {game.description}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    )}
                </IonRow>
            </IonGrid>
            </IonContent>
        </IonModal>
    );
};

export default SelectGameModal;