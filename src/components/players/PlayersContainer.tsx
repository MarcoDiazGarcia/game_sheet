import React from 'react';
import { IPlayer } from '../../entities/interfaces/IPlayer';
import './PlayersContainer.css';

import PlayerItem from './PlayerItem';
import { IonList } from '@ionic/react';

interface ContainerProps { 
  players: IPlayer[];
  selectPlayer: (player: IPlayer) => void;
  unselectPlayer: (player: IPlayer) => void;
  deletePlayer: (player: IPlayer) => void;
}

const PlayersContainer: React.FC<ContainerProps> = ({ players, selectPlayer, unselectPlayer, deletePlayer }: ContainerProps) => {
  return (
    <div className='ion-padding-horizontal player-container'>
      {players.map(player => 
        <PlayerItem key={player.id} player={player} deletePlayer={deletePlayer} 
          selectPlayer={selectPlayer} unselectPlayer={unselectPlayer}/>
      )}
    </div>
  );
};

export default PlayersContainer;
