import React from "react";

import './Settings.css';

import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToggle, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { caretBack } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";

const Settings: React.FC = () => {
    const [settings, setSettings] = React.useState({ darkMode: true } as { darkMode: boolean });

    useIonViewWillEnter(() => {
        Preferences.get({ key: 'settings' }).then((result) => {
            if (result.value === null) {
                return;
            }
            
            const savedSettings = JSON.parse(result.value);
            setSettings(savedSettings);
            document.body.classList.toggle('dark', savedSettings.darkMode);
        });
    });

    function toggleDarkMode() {
        const updatedSettings = { ...settings, darkMode: !settings.darkMode};
        setSettings(updatedSettings);
        document.body.classList.toggle('dark', updatedSettings.darkMode);

        Preferences.set({ key: 'settings', value: JSON.stringify(updatedSettings)});
    }

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton icon={caretBack}></IonBackButton>
                </IonButtons>
                <IonTitle>Settings</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonList>
                <IonItem>
                    <IonToggle enableOnOffLabels={true} checked={settings.darkMode} onIonChange={toggleDarkMode}>Dark Mode</IonToggle>
                </IonItem>
            </IonList>
        </IonContent>
    </IonPage>
  );
};

export default Settings;