import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/pages/home';
import EditPage from './components/pages/editPage';
import Notification from './components/pages/notification';
import Settings from './components/pages/settings';

interface RoutesProps {
  user: any;
}

const Routes = ({ user }: RoutesProps) => (
  <Router>
    <Scene key='root'>
      <Scene
        key='home'
        component={() => <Home user={user} />}
        title='Home'
        init
        initial
      />
      <Scene
        key='edit'
        component={() => <EditPage></EditPage>}
        init
        title='Edit Prescription'
      />
      <Scene
        key='notification'
        component={Notification}
        init
        title='Notification Setting'
      />
      <Scene key='settings' component={Settings} title='Settings' />
    </Scene>
  </Router>
);
export default Routes;
