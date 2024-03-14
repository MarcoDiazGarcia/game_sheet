import { IPlayer } from '../../../entities/interfaces/IPlayer';
import './YahtzeeEndscreenPlayer.css';

interface YahtzeeEndscreenPlayerProps {
    player: IPlayer;
    score: number;
    place: number;
}

const YahtzeeEndscreenPlayer: React.FC<YahtzeeEndscreenPlayerProps> = (props) => {
    const { player, score, place } = props;

    return (
        <div className="player" style={{borderColor: '#' + player.color}}>
            <div className="place" style={{borderColor: '#' + player.color}}>{place}</div>
            <div className="name">{player.name}</div>
            <div className="score" style={{borderColor: '#' + player.color}}>{score}</div>
        </div>
    );
};

export default YahtzeeEndscreenPlayer;