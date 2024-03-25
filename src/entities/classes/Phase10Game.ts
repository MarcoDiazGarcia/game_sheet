import IPhase10Game from "../interfaces/IPhase10Game";
import IPhase10Sheet from "../interfaces/IPhase10Sheet";
import { IPlayer } from "../interfaces/IPlayer";
import Phase10Sheet from "./Phase10Sheet";

export default class Phase10Game implements IPhase10Game {
    dealer: IPlayer;
    round: number;

    current?: {
        player: IPlayer;
        sheet: IPhase10Sheet;
    };

    sheets: Map<number, IPhase10Sheet>;

    constructor(
        public players: IPlayer[],
        phase10Game?: IPhase10Game, 
    ) {
        if (phase10Game) {
            this.players = phase10Game.players;
            this.dealer = phase10Game.dealer;
            this.round = phase10Game.round;
            this.current = phase10Game.current;
            this.sheets = phase10Game.sheets;
            return;
        }

        this.dealer = players[0];
        this.round = 1;

        this.sheets = new Map<number, IPhase10Sheet>();
        players.forEach((player) => this.sheets.set(player.id, new Phase10Sheet()));
        this.current = {
            player: players[0],
            sheet: this.sheets.get(players[0]?.id) ? this.sheets.get(players[0].id)! : new Phase10Sheet()
        };
    }

    get next() {
        const index = this.players.indexOf(this.current!.player);
        const nextIndex = index === this.players.length - 1 ? 0 : index + 1;
        const nextPlayer = this.players[nextIndex];
        return {
            player: nextPlayer,
            sheet: this.sheets.get(nextPlayer.id)!
        }; 
    }

    get prev() {
        const index = this.players.indexOf(this.current!.player);
        const prevIndex = index === 0 ? this.players.length - 1 : index - 1;
        const prevPlayer = this.players[prevIndex];
        return {
            player: prevPlayer,
            sheet: this.sheets.get(prevPlayer.id)!
        };
    }

    get gameOver() {
        let isGameOver = false;

        this.sheets.forEach((sheet) => {
            if (sheet.isFinished) {
                isGameOver = true;
            }
        });

        return isGameOver;
    }

    public setNextRound() {
        this.round++;

        const index = this.players.indexOf(this.dealer);
        const nextIndex = index === this.players.length - 1 ? 0 : index + 1;
        this.dealer = this.players[nextIndex];
    }
}