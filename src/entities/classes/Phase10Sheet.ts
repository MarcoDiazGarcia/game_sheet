import IPhase10Sheet from "../interfaces/IPhase10Sheet";

export default class Phase10Sheet implements IPhase10Sheet {
    public history: IPhase10Sheet[];
    public phase: number;
    public score: number;
    
    constructor() {
        this.history = [];
        this.phase = 1;
        this.score = 0;
    }

    get totalScore(): number {
        return this.history.reduce((acc, sheet) => acc + sheet.score, this.score);
    }

    get isFinished(): boolean {
        return this.phase > 10;
    }
}