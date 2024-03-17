import IGame from "../interfaces/IGame";

export default class Game implements IGame {
    static idCounter: number = 0;

    public id: number;

    constructor(
        public name: string,
        public description: string,
        public minPlayers: number,
        public maxPlayers: number,
        public image: string,
        public rules: string,
        public route: string
    ) {
        this.id = Game.idCounter++;
    }
}