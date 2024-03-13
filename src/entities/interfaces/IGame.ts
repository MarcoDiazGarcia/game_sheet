import { IPlayer } from "./IPlayer";
import { IYahtzeeSheet } from "./IYahtzeeSheet";

export interface IGame {
    players: IPlayer[];
    yahtzeeSheets: IYahtzeeSheet[];
    gameOver: boolean;
}