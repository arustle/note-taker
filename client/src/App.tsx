import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import { images, listOutline, homeOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Items from './pages/Items';
import LogIn from './pages/Login';
import RecordView from './pages/RecordView.route';

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
import {useAuth} from "./auth/AuthProvider";
import Tab2 from "./pages/Tab2";


const App: React.FC<any> = () => {

    const auth = useAuth();


    // if (!auth.isAuthenticated()) return (<LogIn auth={auth} />);



    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/" component={Home} />
                <Route exact path="/items" component={Items} />
                <Route exact path="/tab2" component={Tab2} />
                <Route exact path="/records/:recordId" component={RecordView} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/">
                    <IonIcon icon={homeOutline}/>
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon icon={images}/>
                    <IonLabel>Photos</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/items">
                    <IonIcon icon={images}/>
                    <IonLabel>Photos</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab4" href="/items">
                    <IonIcon icon={listOutline}/>
                    <IonLabel>Items</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default App;
