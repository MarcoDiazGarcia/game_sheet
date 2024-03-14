import { IYahtzeeGame } from "../interfaces/IYahtzeeGame";
import { IYahtzeeSheet } from "../interfaces/IYahtzeeSheet";
import { Player } from "./Player";
import { YahtzeeSheet } from "./YahtzeeSheet";

export class YahtzeeGame implements IYahtzeeGame {
    public yahtzeeSheets: Map<number, IYahtzeeSheet>;
    public current: {
        player: Player;
        yahtzeeSheet: YahtzeeSheet;
    };

    constructor(
        public players: Player[],
        yahtzeeGame?: IYahtzeeGame 
    ) { 
        if(yahtzeeGame) {
            this.players = yahtzeeGame.players;
            this.yahtzeeSheets = yahtzeeGame.yahtzeeSheets;
            this.current = yahtzeeGame.current;
            return;
        }

        this.yahtzeeSheets = new Map<number, IYahtzeeSheet>();
        players.map(player => this.yahtzeeSheets.set(player.id, new YahtzeeSheet()));
        this.current = {
            player: players[0],
            yahtzeeSheet: this.yahtzeeSheets.get(players[0].id)!,
        };
    }

    get next(): { player: Player, yahtzeeSheet: YahtzeeSheet } {
        const nextPlayerIndex = this.players.indexOf(this.current.player) + 1;
        const nextPlayer = this.players[nextPlayerIndex] || this.players[0];

        const nextP = {
            player: nextPlayer,
            yahtzeeSheet: this.yahtzeeSheets.get(nextPlayer.id)!,
        };

        return nextP;
    }

    get prev(): { player: Player, yahtzeeSheet: YahtzeeSheet } {
        const prevPlayerIndex = this.players.indexOf(this.current.player) - 1;
        const prevPlayer = this.players[prevPlayerIndex] || this.players[this.players.length - 1];

        const prevP = {
            player: prevPlayer,
            yahtzeeSheet: this.yahtzeeSheets.get(prevPlayer.id)!,
        };

        return prevP;
    }

    get gameOver(): boolean {
        let isFinished = false;

        this.yahtzeeSheets.forEach(sheet => {if(sheet.isFinished) isFinished = true;});

        return isFinished;
    }
}