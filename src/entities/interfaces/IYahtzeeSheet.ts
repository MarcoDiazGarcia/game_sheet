export interface IYahtzeeSheet {
    ones?: number;
    twos?: number;
    threes?: number;
    fours?: number;
    fives?: number;
    sixes?: number;
    threeOfAKind?: number;
    fourOfAKind?: number;
    smallStraight?: number;
    largeStraight?: number;
    fullHouse?: number;
    yahtzee?: number;
    chance?: number;
    bonusThreshold: number;
    bonus: boolean;
    total: number;
    isFinished: boolean;
}