import { IPlayer } from "./IPlayer";
import { IYahtzeeSheet } from "./IYahtzeeSheet";

export interface IYahtzeeGame {
    players: IPlayer[];
    yahtzeeSheets: Map<number, IYahtzeeSheet>;
    gameOver: boolean;
}