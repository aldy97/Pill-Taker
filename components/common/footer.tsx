import React, { useState, useEffect } from 'react';
import TabBar from '@ant-design/react-native/lib/tab-bar';
import { IconFill } from '@ant-design/icons-react-native';
import * as Font from 'expo-font';
import { Actions } from 'react-native-router-flux';
import { AppLoading } from 'expo';

function Footer() {
  //default scene is Home, which corresponds to 0-index
  const [scene, setScene] = useState<number>(0);

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

  {
    return isReady ? (
      <TabBar
        unselectedTintColor='#949494'
        tintColor='#0e9dec'
        barTintColor='#eee'
      >
        <TabBar.Item
          title='Home'
          icon={
            <IconFill name='home' color={scene === 0 ? '#0e9dec' : '#949494'} />
          }
          selected={scene === 0}
          onPress={() => {
            if (scene !== 0) {
              Actions.home();
              setScene(0);
            }
          }}
        ></TabBar.Item>
        <TabBar.Item
          title='Edit'
          icon={
            <IconFill name='edit' color={scene === 1 ? '#0e9dec' : '#949494'} />
          }
          selected={scene === 1}
          onPress={() => {
            if (scene !== 1) {
              Actions.edit();
              setScene(1);
            }
          }}
        ></TabBar.Item>
        <TabBar.Item
          title='Settings'
          icon={
            <IconFill
              name='setting'
              color={scene === 3 ? '#0e9dec' : '#949494'}
            />
          }
          selected={scene === 3}
          onPress={() => {
            if (scene !== 3) {
              Actions.settings();
              setScene(3);
            }
          }}
        ></TabBar.Item>
      </TabBar>
    ) : (
      <AppLoading></AppLoading>
    );
  }
}

export default Footer;
