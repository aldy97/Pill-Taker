import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import * as Google from 'expo-google-app-auth';
import { IconFill } from '@ant-design/icons-react-native';
import { handleAddBtnPress } from './components/store/ActionsCreator';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/pages/home';
import EditPage from './components/pages/editPage';
import Settings from './components/pages/settings';
import MedDetail from './components/pages/medDetail';
import EditOneMed from './components/pages/editOneMed';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Actions } from 'react-native-router-flux';

interface RoutesProps {
  user: Google.GoogleUser;
  setUser: any;
  toogle?: any;
  addModalOpen?: boolean;
}

const Routes = ({ user, toogle, setUser, addModalOpen }: RoutesProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  //font loading
  async function prep() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    // eslint-disable-next-line
    setIsReady(true);
  }

  useEffect(() => {
    prep();
  }, []);

  return isReady ? (
    <Router>
      <Scene key='root' panHandlers={null}>
        <Scene
          back={addModalOpen}
          onBack={() => {
            toogle(false);
            Actions.home();
          }}
          left={() => null}
          key='home'
          component={() => <Home user={user} />}
          title={addModalOpen ? 'Add medicine' : 'Home'}
          initial
          renderRightButton={() =>
            !addModalOpen ? (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  toogle(true);
                }}
              >
                <IconFill name='plus-circle' size={30} />
              </TouchableOpacity>
            ) : (
              <View></View>
            )
          }
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
        <Scene
          left={() => null}
          key='edit'
          component={() => <EditPage user={user}></EditPage>}
          title='Edit Prescription'
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
        <Scene
          left={() => null}
          key='settings'
          component={() => <Settings user={user} setUser={setUser}></Settings>}
          title='Settings'
          navigationBarStyle={{ backgroundColor: '#eee' }}
        />
        <Scene
          back
          key='editOneMed'
          title='Edit this medicine'
          component={() => <EditOneMed user={user} />}
        />
      </Scene>
    </Router>
  ) : (
    <AppLoading></AppLoading>
  );
};

const mapState = (state: any) => {
  return {
    addModalOpen: state.getIn(['reducer', 'addModalOpen']),
  };
};

const mapDispatch = (dispatch: any) => ({
  toogle(addModalOpen: boolean) {
    const action = handleAddBtnPress(addModalOpen);
    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(Routes);
