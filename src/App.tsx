import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonViewWillEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import PlayerOrder from './pages/PlayerOrder';
import YahtzeeGame from './pages/YahtzeeGamePage';
import Phase10GamePage from './pages/Phase10GamePage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Settings from './pages/Settings';
import { Preferences } from '@capacitor/preferences';

setupIonicReact();

const App: React.FC = () => {
    let settings = {
      darkMode: true
    }

    console.log('useIonViewWillEnter');

    Preferences.get({ key: 'settings' }).then((result) => {
      if (result.value === null) {
        Preferences.set({ key: 'settings', value: JSON.stringify(settings)});
        return;
      }
      
      settings = JSON.parse(result.value);
      document.body.classList.toggle('dark', settings.darkMode);
    });

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/game/phase10">
            <Phase10GamePage />
          </Route>
          <Route exact path="/game/yahtzee">
            <YahtzeeGame />
          </Route>
          <Route exact path="/player-order">
            <PlayerOrder />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
