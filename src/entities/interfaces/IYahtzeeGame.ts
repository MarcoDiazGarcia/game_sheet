import { IPlayer } from "./IPlayer";
import { IYahtzeeSheet } from "./IYahtzeeSheet";

export interface IYahtzeeGame {
    players: IPlayer[];
    current?: {
        player: IPlayer;
        yahtzeeSheet: IYahtzeeSheet;
    };
    yahtzeeSheets: Map<number, IYahtzeeSheet>;
    gameOver: boolean;
    get next(): {
        player: IPlayer;
        yahtzeeSheet: IYahtzeeSheet;
    };
    get prev(): {
        player: IPlayer;
        yahtzeeSheet: IYahtzeeSheet;
    };
}