export default interface IGame {
    id: number;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    image: string;
    rules: string;
    route: string;
}