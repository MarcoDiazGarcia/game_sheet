import IPhase10Sheet from "../interfaces/IPhase10Sheet";

export default class Phase10Sheet implements IPhase10Sheet {
    public history: IPhase10Sheet[];
    public phase: number;
    public score: number;
    
    constructor(sheet?: IPhase10Sheet) {
        if (sheet) {
            this.history = sheet.history;
            this.phase = sheet.phase;
            this.score = sheet.score;
            return;
        }

        this.history = [];
        this.phase = 1;
        this.score = 0;
        this.history.push({...this});
    }

    get totalScore(): number {
        return this.history.reduce((acc, sheet) => acc + sheet.score, 0);
    }

    get isFinished(): boolean {
        return this.phase > 10;
    }

    public updateScoreForRound(score: number, round: number): void {
        const previousScore = this.history[round].score;
        this.history[round].score = score;

        let updatePhase = 0;

        if (previousScore < 10 && score >= 10) {
            updatePhase = -1;
        } else if (previousScore >= 10 && score < 10) {
            updatePhase = 1;
        }

        for (let i = round; i < this.history.length; i++) {
            this.history[i].phase += updatePhase;
        }

        this.phase += updatePhase;
    }

    public deleteRound(round: number): void {
        let updatePhase = this.history[round].score < 10 ? true : false;
        this.history = this.history.filter((h, i) => i !== round);

        if (updatePhase) {
            for (let i = round; i < this.history.length; i++) {
                const phase = this.history[i].phase - 1;
                this.history[i] = {...this.history[i], phase};
            }
            this.phase--;
        }
    }
}