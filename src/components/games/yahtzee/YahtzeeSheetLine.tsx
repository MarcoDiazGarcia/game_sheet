import { IonSelect, IonSelectOption } from '@ionic/react';
import './YahtzeeSheetLine.css';

interface YahtzeeSheetLineProps {
    title: string;
    symbolType: string;
    selectValue: number;
    selectMin: number;
    selectMax: number;
    selectSteps: number;
    dispatch: (action: any) => void;
}

const YahtzeeSheetLine: React.FC<YahtzeeSheetLineProps> = (YahtzeeSheetLineProps) => {
    const { title, symbolType, selectValue, selectMin, selectMax, selectSteps, dispatch } = YahtzeeSheetLineProps;
    const selectValues = Array.from({length: ((selectMax - selectMin) / selectSteps) + 1}, (_, i) => (i + selectMin - selectSteps + 1) * selectSteps);
    selectValues.unshift(0);

    return (
        <div className="line">
            <IonSelect justify="space-between" interface="popover" label={title} value={selectValue} onIonChange={(e) => dispatch({type: 'score-entered', score: {symbol: symbolType, value: e.detail.value}})}>
                {selectValues.map((sv: number) => <IonSelectOption value={sv} key={title + '-' + sv}>{sv}</IonSelectOption>)}
            </IonSelect>
        </div>
    );
};

export default YahtzeeSheetLine;