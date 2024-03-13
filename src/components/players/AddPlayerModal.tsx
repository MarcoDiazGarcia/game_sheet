import './AddPlayerModal.css';

import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonRange, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { IPlayer } from "../../entities/interfaces/IPlayer";
import { Player } from '../../entities/classes/Player';

interface AddPlayerModalProps {
    onPlayerAdd: (player: IPlayer) => void;
    onClose: () => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ onPlayerAdd, onClose }) => {
    let name: string = "";
    const [color, setColor] = useState(() => Math.floor(Math.random()*16777215).toString(16));

    function addPlayer() {
        if (name === "") {
            return;
        }

        const player: IPlayer = new Player(name, color);

        onPlayerAdd(player);
        name = "";
        setColor(Math.floor(Math.random()*16777215).toString(16));

        onClose();
    }

    function dectoHexTwoDigits(dec: number): string {
        let hex = dec.toString(16).toUpperCase();
        if (hex.length === 1) {
            hex = "0" + hex;
        }
        return hex;
    }

    function buildRGBString(nr?: number, ng?: number, nb?: number): string {
        let r: number = parseInt(color.slice(0, 2), 16);
        let g: number = parseInt(color.slice(2, 4), 16);
        let b: number = parseInt(color.slice(4, 6), 16);
        
        if (nr !== undefined) r = nr;
        if (ng !== undefined) g = ng;
        if (nb !== undefined) b = nb;
        
        return `rgb(${r}, ${g}, ${b})`;
    }

    function changeRedValue(rv: number) {
        const hex = dectoHexTwoDigits(rv);
        setColor(c => c = hex + c.slice(2, 6));
    }

    function changeGreenValue(gv: number) {
        const hex = dectoHexTwoDigits(gv);
        setColor(c => c = c.slice(0, 2) + hex + c.slice(4, 6));
    }

    function changeBlueValue(bv: number) {
        const hex = dectoHexTwoDigits(bv);
        setColor(c => c = c.slice(0, 4) + hex);
    }

    return (
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => onClose()}>Close</IonButton>
                    </IonButtons>
                    <IonTitle>Add Player</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => addPlayer()}>Add</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <div className="input-container ion-padding">
                <IonInput label="Name" labelPlacement="floating" fill="outline" placeholder="Enter Name" 
                    value={name} onIonChange={e => name = e.detail.value!}></IonInput>
                <div className="color-container">
                    <IonInput label="Color" labelPlacement="floating" fill="outline" placeholder="000000" value={color} 
                        style={{background: '#' + color}} onIonChange={e => setColor(c => c = e.detail.value!)} />
                    <IonRange className="range-red" labelPlacement="fixed" label="Red" min={0} max={255} value={parseInt(color.slice(0, 2), 16)}
                        onIonInput={({ detail }) => changeRedValue(detail.value.valueOf() as number)}
                        style={{'--bar-background': 'linear-gradient(to right,' + buildRGBString(0) + ', ' + buildRGBString(255)}}>
                    </IonRange>
                    <IonRange className="range-green" labelPlacement="fixed" label="Green" min={0} max={255} value={parseInt(color.slice(2, 4), 16)}
                        onIonInput={({ detail }) => changeGreenValue(detail.value.valueOf() as number)}
                        style={{'--bar-background': 'linear-gradient(to right,' + buildRGBString(undefined, 0) + ', ' + buildRGBString(undefined, 255)}}>
                    </IonRange>
                    <IonRange className="range-blue" labelPlacement="fixed" label="Blue" min={0} max={255} value={parseInt(color.slice(4, 6), 16)}
                        onIonInput={({ detail }) => changeBlueValue(detail.value.valueOf() as number)}
                        style={{'--bar-background': 'linear-gradient(to right,' + buildRGBString(undefined, undefined, 0) + ', ' + buildRGBString(undefined, undefined, 255)}}>
                    </IonRange>
                </div>
            </div>
        </IonContent>
    );
};

export default AddPlayerModal;