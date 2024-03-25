import { IPlayer } from '../../../entities/interfaces/IPlayer';
import './Phase10EndScreenPlayer.css';

interface Phase10EndscreenPlayerProps {
    player: IPlayer;
    score: number;
    phase: number;
    place: number;
}

const Phase10EndscreenPlayer: React.FC<Phase10EndscreenPlayerProps> = (props) => {
    const { player, score, phase, place } = props;

    return (
        <div className="ion-margin phase10-endscreen-player" style={{borderColor: '#' + player.color}}>
            <div className="place" style={{borderColor: '#' + player.color}}>{place}</div>
            <div className="name">{player.name}</div>
            <div className="score" style={{borderColor: '#' + player.color}}>{phase + ' | ' + score}</div>
        </div>
    );
};

export default Phase10EndscreenPlayer;