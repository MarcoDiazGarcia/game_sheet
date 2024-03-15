import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PlayersContainer from '../components/players/PlayersContainer';
import AddPlayerModal from '../components/players/AddPlayerModal';
import './Home.css';
import { useEffect, useState } from 'react';
import { IPlayer } from '../entities/interfaces/IPlayer';
import { loadDefaultPlayers } from '../data/data';
import { addIcons } from 'ionicons';
import { addOutline, play } from 'ionicons/icons';
import { useHistory } from 'react-router';
import WarningToast from '../components/toasts/WarningToast';

addIcons({
  "add-outline": addOutline
});

const Home: React.FC = () => {
  const history = useHistory();

  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>([]);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showWarningToast, setShowWarningToast] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    setPlayers(loadDefaultPlayers);
  }, []);

  function addPlayer(player: IPlayer) {
    const newPlayers = [...players, player];
    setPlayers(newPlayers);
  }

  function deletePlayer(player: IPlayer) {
    const newPlayers = players.filter(p => p.id !== player.id);
    setPlayers(newPlayers);
  }

  function selectPlayer(player: IPlayer) {
    player.selected = !player.selected;
    const newSelectedPlayers = [...selectedPlayers, player];
    setSelectedPlayers(newSelectedPlayers);
  }

  function unselectPlayer(player: IPlayer) {
    player.selected = !player.selected;
    const newSelectedPlayers = selectedPlayers.filter(p => p.id !== player.id);
    setSelectedPlayers(newSelectedPlayers);
  }

  function closeAddPlayerModal() {
    setShowAddPlayerModal(false);
  }

  function startGame() {
    if (selectedPlayers.length < 2) {
      setWarningMessage('You need to select at least 2 players to start a game');
      setShowWarningToast(true);
      return;
    }
    
    history.push('/player-order', { players: selectedPlayers });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton className='ion-padding' onClick={startGame} expand="block">Start a Game</IonButton>

        <PlayersContainer players={players} deletePlayer={deletePlayer} 
          selectPlayer={selectPlayer} unselectPlayer={unselectPlayer} />

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => setShowAddPlayerModal(true)}>
            <IonIcon icon="add-outline"></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showAddPlayerModal}>
          <AddPlayerModal onPlayerAdd={addPlayer} onClose={closeAddPlayerModal}/>
        </IonModal>

        <WarningToast 
          message={warningMessage} 
          show={showWarningToast}
          setShow={setShowWarningToast}
        ></WarningToast>
      </IonContent>
    </IonPage>
  );
};

export default Home;
