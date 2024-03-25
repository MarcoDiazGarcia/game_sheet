export default interface IPhase10Sheet {
    history: IPhase10Sheet[];
    phase: number;
    score: number;
    totalScore: number;
    isFinished: boolean;
    updateScoreForRound: (score: number, round: number) => void;
    deleteRound: (round: number) => void;
}
