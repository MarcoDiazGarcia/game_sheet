import './GamePlayerHeader.css';

interface GamePlayerHeaderProps {
    players: string[];
    prevPlayer: () => void;
    nextPlayer: () => void;
}

const GamePlayerHeader: React.FC = () => {
    return (
        <div className='game-player-header'>
            <h1>Game Player Header</h1>
        </div>
    );
}