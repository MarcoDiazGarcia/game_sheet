import IPhase10Game from "../interfaces/IPhase10Game";
import IPhase10Sheet from "../interfaces/IPhase10Sheet";
import { IPlayer } from "../interfaces/IPlayer";
import Phase10Sheet from "./Phase10Sheet";

export default class Phase10Game implements IPhase10Game {
    current?: {
        player: IPlayer;
        sheet: IPhase10Sheet;
    };
    sheets: Map<number, IPhase10Sheet>;
    gameOver: boolean;
    constructor(
        public players: IPlayer[], 
    ) {
        this.sheets = new Map<number, IPhase10Sheet>();
        players.forEach((player) => this.sheets.set(player.id, new Phase10Sheet()));
        this.gameOver = false;
    }
    get next() {
        const index = this.players.indexOf(this.current.player);
        const nextIndex = index === this.players.length - 1 ? 0 : index + 1;
        return {
            player: this.players[nextIndex],
            sheet: this.sheets.get(nextIndex)!
        }; 
    }
    get prev() {
        const index = this.players.indexOf(this.current.player);
        const prevIndex = index === 0 ? this.players.length - 1 : index - 1;
        return {
            player: this.players[prevIndex],
            sheet: this.sheets.get(prevIndex)!
        };
    }
}