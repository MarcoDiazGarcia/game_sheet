import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import './YahtzeeEndscreenModal.css'
import YahtzeeEndscreenPlayer from './YahtzeeEndscreenPlayer';
import { IYahtzeeGame } from '../../../entities/interfaces/IYahtzeeGame';
import { YahtzeeGame } from '../../../entities/classes/YahtzeeGame';
import { YahtzeeSheet } from '../../../entities/classes/YahtzeeSheet';
import { IYahtzeeSheet } from '../../../entities/interfaces/IYahtzeeSheet';

interface YahtzeeEndscreenModalProps {
    show: boolean;
    yahtzeeGame: IYahtzeeGame;
    dispatch: (action: any) => void;
}

const YahtzeeEndscreenModal: React.FC<YahtzeeEndscreenModalProps> = (props) => {
    const { show, yahtzeeGame, dispatch } = props;

    const yahtzeeSheets: Map<number, IYahtzeeSheet> = new Map<number, IYahtzeeSheet>();
    yahtzeeGame.yahtzeeSheets.forEach((sheet: IYahtzeeSheet, key: number) => yahtzeeSheets.set(key, new YahtzeeSheet(sheet)));

    const playersByScore = yahtzeeGame.players.sort((a, b) => {
        console.log(yahtzeeGame.yahtzeeSheets);
        console.log(a);
        console.log(yahtzeeGame.yahtzeeSheets.get(a.id)!.total - yahtzeeGame.yahtzeeSheets.get(b.id)!.total);
        return (new YahtzeeSheet(yahtzeeGame.yahtzeeSheets.get(b.id)!).total - new YahtzeeSheet(yahtzeeGame.yahtzeeSheets.get(a.id))!.total);
    });

    console.log(playersByScore);

    return (
        <IonModal isOpen={show}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Game Over</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {playersByScore.map((player, i) => <YahtzeeEndscreenPlayer key={player.id} player={player} place={i+1} score={yahtzeeSheets.get(player.id)!.total}></YahtzeeEndscreenPlayer>)}
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

export default YahtzeeEndscreenModal;