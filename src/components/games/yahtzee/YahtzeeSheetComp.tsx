import './YahtzeeSheetComp.css';
import { IYahtzeeSheet } from '../../../entities/interfaces/IYahtzeeSheet';

import gameInfo from '../../../entities/game-info.json';
import YahtzeeSheetLine from './YahtzeeSheetLine';
import { YahtzeeSheet } from '../../../entities/classes/YahtzeeSheet';

interface YahtzeeSheetProps {
    color: string;
    yahtzeeSheet: IYahtzeeSheet;
    dispatch: (action: any) => void;
}

const YahtzeeSheetComp: React.FC<YahtzeeSheetProps> = (props) => {
    const yahtzeeSheet = new YahtzeeSheet(props.yahtzeeSheet);
    const { color, dispatch } = props;

    return (
        <div className="yahtzee-sheet" style={{backgroundColor: '#' + color}}>
            <div className="upper-section">
                {gameInfo.symbolTypes.slice(0, 6).map((type: string[]) => 
                    <YahtzeeSheetLine 
                        key={type[0]}
                        title={gameInfo.symbolName.de[type[0]]} 
                        symbolType={type[1]}
                        selectValue={yahtzeeSheet[type[1]]} 
                        selectMin={gameInfo.symbolPointsRange[type[0]].min} 
                        selectMax={gameInfo.symbolPointsRange[type[0]].max}
                        selectSteps={gameInfo.symbolPointsRange[type[0]].step}
                        dispatch={dispatch}
                    ></YahtzeeSheetLine>
                )}
                <div className="bonus-line">
                    <div className="bonus">
                        Bonus ({gameInfo.symbolPointsRange.BONUS.threshold - yahtzeeSheet.bonusThreshold}/{gameInfo.symbolPointsRange.BONUS.threshold + (yahtzeeSheet.bonus ? '' : ' || ' + yahtzeeSheet.bonusThreshold)}):
                    </div>
                    <div className="points">{yahtzeeSheet.bonus ? gameInfo.symbolPointsRange.BONUS.points : 0}</div>
                </div>
                <div className="total-line">
                    <div className="total">Total:</div>
                    <div className="points">{yahtzeeSheet.totalUpperSection}</div>
                </div>
            </div>
            <div className="lower-section">
                {gameInfo.symbolTypes.slice(7).map((type: string[]) => 
                    <YahtzeeSheetLine 
                        key={type[0]}
                        title={gameInfo.symbolName.de[type[0]]} 
                        symbolType={type[1]}
                        selectValue={yahtzeeSheet[type[1]]} 
                        selectMin={gameInfo.symbolPointsRange[type[0]].min} 
                        selectMax={gameInfo.symbolPointsRange[type[0]].max}
                        selectSteps={gameInfo.symbolPointsRange[type[0]].step}
                        dispatch={dispatch}
                    ></YahtzeeSheetLine>
                )}
                <div className="total-line">
                    <div className="total">Total:</div>
                    <div className="points">{yahtzeeSheet.totalLowerSection}</div>
                </div>
            </div>
            <div className="final-score">
                <div className="points">{yahtzeeSheet.total}</div>
            </div>
        </div>
    );
};

export default YahtzeeSheetComp;