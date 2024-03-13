import { Player } from "../entities/classes/Player";
import { IPlayer } from "../entities/interfaces/IPlayer";

export function loadDefaultPlayers(): IPlayer[] {
    return [
        new Player("Kadda", "e1a7fa"),
        new Player("Marco", "3fb3c5"),
        new Player("Marius", "18d35e"),
        new Player("Paula", "543b9c")
    ];
}