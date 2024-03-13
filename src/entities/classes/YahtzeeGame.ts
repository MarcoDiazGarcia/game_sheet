import { IYahtzeeGame } from "../interfaces/IYahtzeeGame";
import { IYahtzeeSheet } from "../interfaces/IYahtzeeSheet";
import { Player } from "./Player";
import { YahtzeeSheet } from "./YahtzeeSheet";

export class YahtzeeGame implements IYahtzeeGame {
    public yahtzeeSheets: Map<number, IYahtzeeSheet>;

    constructor(
        public players: Player[], 
    ) { 
        this.yahtzeeSheets = new Map<number, IYahtzeeSheet>();
        players.map(player => this.yahtzeeSheets.set(player.id, new YahtzeeSheet()));
    }

    get gameOver(): boolean {
        let isFinished = false;

        this.yahtzeeSheets.forEach(sheet => {if(sheet.isFinished) isFinished = true;});

        return isFinished;
    }
}