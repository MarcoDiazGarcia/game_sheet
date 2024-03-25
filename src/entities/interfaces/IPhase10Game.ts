import IPhase10Sheet from "./IPhase10Sheet";
import { IPlayer } from "./IPlayer";

export default interface IPhase10Game {
    players: IPlayer[];
    dealer: IPlayer;
    round: number;
    current?: {
        player: IPlayer;
        sheet: IPhase10Sheet;
    };
    sheets: Map<number, IPhase10Sheet>;
    gameOver: boolean;
    get next(): {
        player: IPlayer;
        sheet: IPhase10Sheet;
    };
    get prev(): {
        player: IPlayer;
        sheet: IPhase10Sheet;
    };
}