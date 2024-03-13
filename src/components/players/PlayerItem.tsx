import './PlayerItem.css';

import { IonChip, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { IPlayer } from "../../entities/interfaces/IPlayer";
import { addIcons } from "ionicons";
import { closeCircleOutline, radioButtonOnOutline } from "ionicons/icons";

addIcons({
    "close-circle-outline": closeCircleOutline,
    "radio-button-on-outline": radioButtonOnOutline
});

interface PlayerItemProps {
    player: IPlayer;
    deletePlayer: (player: IPlayer) => void;
    selectPlayer: (player: IPlayer) => void;
    unselectPlayer: (player: IPlayer) => void;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ player, deletePlayer, selectPlayer, unselectPlayer }: PlayerItemProps): JSX.Element => {
    function onSelectPlayer() {
        if (player.selected) {
            unselectPlayer(player);
        } else {
            selectPlayer(player);
        }
    }
    
    return (
        <div className={'player-item' + (player.selected ? ' selected' : '')} onClick={onSelectPlayer}>
            <div className="player-item-info">
                <IonIcon icon="radio-button-on-outline" style={{color: "#" + player.color}}></IonIcon>
                <IonLabel>{player.name}</IonLabel>
            </div>
            <IonIcon className="close-player-item" icon="close-circle-outline" onClick={() => deletePlayer(player)}></IonIcon>
        </div>
    );
};

export default PlayerItem;