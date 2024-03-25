import React, { useEffect, useReducer, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import './Phase10GamePage.css';

import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';

import IPhase10Game from '../entities/interfaces/IPhase10Game';
import Phase10Game from '../entities/classes/Phase10Game';
import { IPlayer } from '../entities/interfaces/IPlayer';
import IPhase10Sheet from '../entities/interfaces/IPhase10Sheet';
import Phase10Sheet from '../entities/classes/Phase10Sheet';

import GamePlayerHeader from '../components/games/GamePlayerHeader';
import Phase10SheetComp from '../components/games/phase10/Phase10SheetComp';
import Phase10OverviwModal from '../components/games/phase10/Phase10OverviewModal';
import Phase10EndScreenModal from '../components/games/phase10/Phase10EndScreenModal';

import { caretBack, podiumOutline } from 'ionicons/icons';
import Phase10EditRoundScoreAlert from '../components/games/phase10/Phase10EditRoundScoreAlert';

const Phase10GamePage: React.FC = () => {
    const [showOverviewModal, setShowOverviewModal] = useState(false);
    const [endScreenModalShow, setEndScreenModalShow] = useState(false);

    const [showEditRoundScoreAlert, setShowEditRoundScoreAlert] = useState(false);
    const [editRoundScoreValue, setEditRoundScoreValue] = useState(0);
    const [editRoundRoundValue, setEditRoundRoundValue] = useState(0);

    const [endGame, setEndGame] = useState(false);
    
    function reducer(state: IPhase10Game, action: any) {
        switch (action.type) {
            case 'next':
                return new Phase10Game([], {...state, current: state.next} as Phase10Game);
            case 'prev':
                return new Phase10Game([], {...state, current: state.prev} as Phase10Game);
            case 'score-entered':
                const newPhase10Sheet: IPhase10Sheet = {...state.current!.sheet} as IPhase10Sheet;
                if (action.score.nextPhase) {
                    newPhase10Sheet.phase++;
                }
                newPhase10Sheet.score = action.score.value;
                newPhase10Sheet.history = [...newPhase10Sheet.history, newPhase10Sheet];
                const phase10Game = new Phase10Game([], {...state, current: {...state.current, sheet: newPhase10Sheet}} as Phase10Game);
                phase10Game.sheets.set(phase10Game.current!.player.id, newPhase10Sheet);
                phase10Game.current = phase10Game.next;

                if (checkAllSameRoundForGame(phase10Game)) {
                    phase10Game.setNextRound();
                }

                return phase10Game;
            case 'round-score-edited':
                const updatedSheet: IPhase10Sheet = new Phase10Sheet({...state.current!.sheet});
                updatedSheet.updateScoreForRound(action.score.value, action.score.round);
                const updatedPhase10Game = new Phase10Game([], {...state, current: {...state.current, sheet: updatedSheet}} as Phase10Game);
                updatedPhase10Game.sheets.set(updatedPhase10Game.current!.player.id, updatedSheet);
                return updatedPhase10Game;
            case 'round-deleted':
                const deletedSheet: IPhase10Sheet = new Phase10Sheet({...state.current!.sheet});
                deletedSheet.deleteRound(action.round);
                const deletedPhase10Game = new Phase10Game([], {...state, current: {...state.current, sheet: deletedSheet}} as Phase10Game);
                deletedPhase10Game.sheets.set(deletedPhase10Game.current!.player.id, deletedSheet);
                return deletedPhase10Game;
            case 'restart':
                setEndScreenModalShow(false);
                return new Phase10Game(state.players);
            case 'end':
                setEndGame(true);
                return new Phase10Game(state.players);
            default:
                throw Error('Unknown action.');
        }
    }

    const history = useHistory();
    const location = useLocation();
    const historyState: { players: IPlayer[] } = location.state ? location.state as { players: IPlayer[] }: { players: [] };

    const [game, dispatchGame] = useReducer(reducer, new Phase10Game(historyState.players));

    function setRound(score: number) {
        let nextPhase = score < 10;
        dispatchGame({type: 'score-entered', score: {value: score, nextPhase: nextPhase}});
    }

    function editRoundScore(round: number) {
        if (round <= 0 || round >= game.current!.sheet.history.length) {
            return;
        }

        setEditRoundRoundValue(round);
        setEditRoundScoreValue(game.current!.sheet.history[round].score);
        setShowEditRoundScoreAlert(true);
    }

    function setScoreForRound(score: number, round: number) {
        dispatchGame({type: 'round-score-edited', score: {value: score, round: round}});
    }

    function deleteRound(round: number) {
        dispatchGame({type: 'round-deleted', round: round});
    }

    function checkAllSameRound(): boolean {
        return checkAllSameRoundForGame(game);
    }

    function checkAllSameRoundForGame(game: IPhase10Game): boolean {
        let round = game.current!.sheet.history.length;
        let allSameRound = true;

        game.sheets.forEach((s: IPhase10Sheet) => {
            if (s.history.length !== round) {
                allSameRound = false;
            }
        });
        return allSameRound;
    }

    useEffect(() => {
        if (endGame) {
            history.push(`/`);
        }

        if (checkAllSameRound()) {
            game.sheets.forEach((s: IPhase10Sheet) => {
                const sheet: IPhase10Sheet = new Phase10Sheet(s as IPhase10Sheet);
                if (sheet.isFinished) {
                    setEndScreenModalShow(true);
                }
            });
        }
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Previous" icon={caretBack}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Phase 10</IonTitle>
                    <IonButtons slot="primary">
                        <IonButton onClick={() => setShowOverviewModal(true)}>
                            <IonIcon slot="icon-only" icon={podiumOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <GamePlayerHeader player={game.current!.player} dispatch={dispatchGame}></GamePlayerHeader>
                <Phase10SheetComp color={game.current!.player.color} setRound={setRound} editRoundScore={editRoundScore} sheet={game.current!.sheet}></Phase10SheetComp>

                <Phase10OverviwModal show={showOverviewModal} setShow={setShowOverviewModal} game={game}></Phase10OverviwModal>

                <Phase10EndScreenModal show={endScreenModalShow} game={game} dispatch={dispatchGame}></Phase10EndScreenModal>

                <Phase10EditRoundScoreAlert score={editRoundScoreValue} round={editRoundRoundValue} show={showEditRoundScoreAlert} setShow={setShowEditRoundScoreAlert} setScoreForRound={setScoreForRound} deleteRound={deleteRound}></Phase10EditRoundScoreAlert>
            </IonContent>
        </IonPage>
    );
};

export default Phase10GamePage;