import { IGame } from "../interfaces/IGame";
import { IYahtzeeSheet } from "../interfaces/IYahtzeeSheet";
import { Player } from "./Player";
import { YahtzeeSheet } from "./YahtzeeSheet";

export class Game implements IGame {
    public yahtzeeSheets: IYahtzeeSheet[];

    constructor(
        public players: Player[], 
    ) { 
        this.yahtzeeSheets = players.map(player => new YahtzeeSheet());
    }

    get gameOver(): boolean {
        return this.yahtzeeSheets.every(sheet => sheet.isFinished);
    }
}