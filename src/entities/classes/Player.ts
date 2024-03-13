import { IPlayer } from "../interfaces/IPlayer";

export class Player implements IPlayer {
    static _id = 0;

    public id: number;
    public selected: boolean;
    constructor(
        public name: string = "", 
        public color: string = Math.floor(Math.random()*16777215).toString(16) 
    ) { 
        this.id = Player._id++;
        this.selected = false;
    }
}