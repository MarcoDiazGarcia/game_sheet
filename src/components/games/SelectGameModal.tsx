import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import './SelectGameModal.css'

interface SelectGameModalProps {
    show: boolean;
    dispatch: (action: any) => void;
}

const SelectGameModal: React.FC<SelectGameModalProps> = (props) => {
    const { show, dispatch } = props;

    return (
        <IonModal isOpen={show}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Choose a game</IonTitle>
                </IonToolbar>
                <IonButtons>
                    <IonButton>Close</IonButton>
                </IonButtons>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem button onClick={() => dispatch({type: 'start', game: 'yahtzee'})}>
                        <IonLabel>Yahtzee</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => dispatch({type: 'start', game: 'chess'})}>
                        <IonLabel>Chess</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonModal>
    );
}