import { IYahtzeeSheet } from "../interfaces/IYahtzeeSheet";
import GameInfo from "../game-info.json";

export class YahtzeeSheet implements IYahtzeeSheet {
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

    constructor(yahtzeeSheet?: IYahtzeeSheet) {
        if (yahtzeeSheet) {
            this.ones = yahtzeeSheet.ones;
            this.twos = yahtzeeSheet.twos;
            this.threes = yahtzeeSheet.threes;
            this.fours = yahtzeeSheet.fours;
            this.fives = yahtzeeSheet.fives;
            this.sixes = yahtzeeSheet.sixes;
            this.threeOfAKind = yahtzeeSheet.threeOfAKind;
            this.fourOfAKind = yahtzeeSheet.fourOfAKind;
            this.smallStraight = yahtzeeSheet.smallStraight;
            this.largeStraight = yahtzeeSheet.largeStraight;
            this.fullHouse = yahtzeeSheet.fullHouse;
            this.yahtzee = yahtzeeSheet.yahtzee;
            this.chance = yahtzeeSheet.chance;
        }
    }

    get bonusThreshold(): number {
        const upperSectionTotal = (this.ones || 0) + (this.twos || 0) + (this.threes || 0) + 
            (this.fours || 0) + (this.fives || 0) + (this.sixes || 0);
        return GameInfo.symbolPointsRange.BONUS.threshold - upperSectionTotal;
    }

    get bonus(): boolean {
        return this.bonusThreshold <= 0;
    }

    get totalUpperSection(): number {
        return (this.ones || 0) + (this.twos || 0) + (this.threes || 0) +
            (this.fours || 0) + (this.fives || 0) + (this.sixes || 0) +
            (this.bonus ? GameInfo.symbolPointsRange.BONUS.points : 0);
    }

    get totalLowerSection(): number {
        return (this.threeOfAKind || 0) + (this.fourOfAKind || 0) +
            (this.smallStraight || 0) + (this.largeStraight || 0) +
            (this.fullHouse || 0) + (this.yahtzee || 0) +
            (this.chance || 0);
    }

    get total(): number {
        return (this.ones || 0) + (this.twos || 0) + (this.threes || 0) +
            (this.fours || 0) + (this.fives || 0) + (this.sixes || 0) +
            (this.threeOfAKind || 0) + (this.fourOfAKind || 0) +
            (this.smallStraight || 0) + (this.largeStraight || 0) +
            (this.fullHouse || 0) + (this.yahtzee || 0) +
            (this.chance || 0) + (this.bonus ? GameInfo.symbolPointsRange.BONUS.points : 0);
    }

    get isFinished(): boolean {
        return (this.ones !== undefined) && (this.twos !== undefined) && (this.threes !== undefined) &&
            (this.fours !== undefined) && (this.fives !== undefined) && (this.sixes !== undefined) &&
            (this.threeOfAKind !== undefined) && (this.fourOfAKind !== undefined) &&
            (this.smallStraight !== undefined) && (this.largeStraight !== undefined) &&
            (this.fullHouse !== undefined) && (this.yahtzee !== undefined) &&
            (this.chance !== undefined);
    }

}