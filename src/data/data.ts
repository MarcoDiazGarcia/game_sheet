import Game from "../entities/classes/Game";
import { Player } from "../entities/classes/Player";
import IGame from "../entities/interfaces/IGame";
import { IPlayer } from "../entities/interfaces/IPlayer";

import path from 'path';

export function loadDefaultPlayers(): IPlayer[] {
    return [
        new Player("Kadda", "e1a7fa"),
        new Player("Marco", "3fb3c5"),
        new Player("Marius", "18d35e"),
        new Player("Paula", "543b9c"),
        new Player("Tom", "b8d6e3"),
        new Player("Kzy", "8a0c00"),
    ];
}

export function loadGames(): IGame[] {
    const gameImagesPath = "assets/game_images/";

    return [
        new Game("Yahtzee", "A game of luck and strategy", 2, 8, gameImagesPath + 'yahtzee-logo.jpg', "The game of Yahtzee is played by rolling five dice to make various combinations. The dice can be rolled up to three times in a turn to try to make various scoring combinations and dice must remain in the box. A game consists of thirteen rounds during which the player chooses which scoring combination is to be used in that round. Once a combination has been used in the game, it cannot be used again. Each of the scoring combinations has a different point value, some of which are fixed values and others of which have the cumulative value of the dice. A Yahtzee is a five-of-a-kind and scores 50 points; the highest of any category. The winner is the player who scores the most points.", "yahtzee"),
        new Game("Phase 10", "A rummy-type card game", 2, 6, gameImagesPath + 'phase10-logo.png', "The game is played with a deck of 108 cards, of which there are 24 of each color (red, blue, yellow, and green), each color having two of each rank, and two each of wild and wild draw four cards. The ranks in each color are 1-12, and the wild cards are black. There are also 4 skip cards in each color. The skip cards are numbered 1 through 4, and act as a 'skip' card in the game. The object of the game is to be the first player to complete 10 varied phases with two sets of three, one run of seven, or seven cards of the same color. The player must complete the phase in order to move to the next phase. Players keep their cards in their hand until their turn. The phases are made of sets (multiple cards of the same value), runs (multiple cards in consecutive ascending order), cards of one color, or a combination of these. Each phase to be completed is specific to each hand dealt, meaning the phases may differ from player to player or from one hand to another.", "phase10"),
    ];
} 