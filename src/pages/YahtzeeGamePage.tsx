import './YahtzeeGamePage.css';

import { IPlayer } from '../entities/interfaces/IPlayer';
import { YahtzeeGame } from '../entities/classes/YahtzeeGame';

import { useEffect, useReducer, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,  } from '@ionic/react';
import GamePlayerHeader from '../components/games/GamePlayerHeader';
import YahtzeeSheetComp from '../components/games/yahtzee/YahtzeeSheetComp';
import { IYahtzeeSheet } from '../entities/interfaces/IYahtzeeSheet';
import YahtzeeEndscreenModal from '../components/games/yahtzee/YahtzeeEndscreenModal';
import { YahtzeeSheet } from '../entities/classes/YahtzeeSheet';
import { caretBack } from 'ionicons/icons';

const YahtzeeGamePage: React.FC = () => {
    const [endScreenModalShow, setEndScreenModalShow] = useState(false);
    const [endGame, setEndGame] = useState(false);
    
    function reducer(state: YahtzeeGame, action: any) {
        switch (action.type) {
            case 'next':
                return new YahtzeeGame([], {...state, current: state.next} as YahtzeeGame);
            case 'prev':
                return new YahtzeeGame([], {...state, current: state.prev} as YahtzeeGame);
            case 'score-entered':
                const newYahtzeeSheet: IYahtzeeSheet = {...state.current!.yahtzeeSheet} as IYahtzeeSheet;
                newYahtzeeSheet[action.score.symbol] = action.score.value;
                const yahtzeeGame = new YahtzeeGame([], {...state, current: {...state.current, yahtzeeSheet: newYahtzeeSheet}} as YahtzeeGame);
                yahtzeeGame.yahtzeeSheets.set(yahtzeeGame.current!.player.id, newYahtzeeSheet);
                yahtzeeGame.current = yahtzeeGame.next;
                return yahtzeeGame;
            case 'restart':
                setEndScreenModalShow(false);
                return new YahtzeeGame(state.players);
            case 'end':
                setEndGame(true);
                return new YahtzeeGame(state.players);
            default:
                throw Error('Unknown action.');
        }
    }

    const history = useHistory();

    useEffect(() => {
        if (endGame) {
            history.push(`/`);
        }

        let isOver: boolean = true;

        yahtzeeGame.yahtzeeSheets.forEach((sheet: IYahtzeeSheet) => {
            const newYahtzeeSheet: IYahtzeeSheet = new YahtzeeSheet(sheet as IYahtzeeSheet);
            if (!newYahtzeeSheet.isFinished) {
                isOver = false;
            }
        });

        if (isOver) {
            setEndScreenModalShow(true);
        }
    });

    const location = useLocation();
    const historyState: { players: IPlayer[] } = location.state ? location.state as { players: IPlayer[] }: { players: [] };

    const [yahtzeeGame, yahtzeeGameDispatch] = useReducer(reducer, new YahtzeeGame(historyState.players));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={caretBack}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Yahtzee | {yahtzeeGame.players.length} Players</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Yahtzee</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <GamePlayerHeader player={yahtzeeGame.current.player} dispatch={yahtzeeGameDispatch}></GamePlayerHeader>
                <YahtzeeSheetComp color={yahtzeeGame.current.player.color} yahtzeeSheet={yahtzeeGame.current.yahtzeeSheet} dispatch={yahtzeeGameDispatch}></YahtzeeSheetComp>

                <YahtzeeEndscreenModal yahtzeeGame={yahtzeeGame} show={endScreenModalShow} dispatch={yahtzeeGameDispatch}></YahtzeeEndscreenModal>
            </IonContent>
        </IonPage>
    );
};

export default YahtzeeGamePage;