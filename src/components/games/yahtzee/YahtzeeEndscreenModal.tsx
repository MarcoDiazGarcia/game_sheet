import { IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import './YahtzeeEndscreenModal.css'
import YahtzeeEndscreenPlayer from './YahtzeeEndscreenPlayer';
import { IYahtzeeGame } from '../../../entities/interfaces/IYahtzeeGame';

interface YahtzeeEndscreenModalProps {
    show: boolean;
    yahtzeeGame: IYahtzeeGame;
}

const YahtzeeEndscreenModal: React.FC<YahtzeeEndscreenModalProps> = (props) => {
    const { show, yahtzeeGame } = props;

    const playersByScore = yahtzeeGame.players.sort((a, b) => {
        return yahtzeeGame.yahtzeeSheets.get(b.id)!.total - yahtzeeGame.yahtzeeSheets.get(a.id)!.total;
    });

    return (
        <IonModal isOpen={show}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Game Over</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {playersByScore.map((player, i) => <YahtzeeEndscreenPlayer player={player} place={i+1} score={yahtzeeGame.yahtzeeSheets.get(player.id)!.total}></YahtzeeEndscreenPlayer>)}
            </IonContent>
        </IonModal>
    );
};

export default YahtzeeEndscreenModal;