import './GamePlayerHeader.css';

import { IonIcon } from '@ionic/react';
import { caretBackOutline, caretForwardOutline } from 'ionicons/icons';
import { IPlayer } from '../../entities/interfaces/IPlayer';

interface GamePlayerHeaderProps {
    player: IPlayer;
    dispatch: (action: any) => void;
}

const GamePlayerHeader: React.FC<GamePlayerHeaderProps> = ({player, dispatch}: GamePlayerHeaderProps) => {
    return (
        <div className='ion-margin game-player-header'>
            <IonIcon icon={caretBackOutline} size='large' onClick={() => dispatch({type: 'prev'})}></IonIcon>
            <div className='player-name' style={{borderColor: '#' + player.color}}>{player.name}</div>
            <IonIcon icon={caretForwardOutline} size='large' onClick={() => dispatch({type: 'next'})}></IonIcon>
        </div>
    );
}

export default GamePlayerHeader;