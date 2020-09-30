import React, { useState } from 'react';
import TabBar from '@ant-design/react-native/lib/tab-bar';
import { Actions } from 'react-native-router-flux';

function Footer() {
  const [scene, setScene] = useState<number>(0);
  return (
    <TabBar
      unselectedTintColor='#949494'
      tintColor='#292f31'
      barTintColor='#eee'
    >
      <TabBar.Item
        title='Home'
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
        selected={scene === 1}
        onPress={() => {
          if (scene !== 1) {
            Actions.edit();
            setScene(1);
          }
        }}
      ></TabBar.Item>
      <TabBar.Item
        title='Notification'
        selected={scene === 2}
        onPress={() => {
          if (scene !== 2) {
            Actions.notification();
            setScene(2);
          }
        }}
      ></TabBar.Item>
      <TabBar.Item
        title='Settings'
        selected={scene === 3}
        onPress={() => {
          if (scene !== 3) {
            Actions.settings();
            setScene(3);
          }
        }}
      ></TabBar.Item>
    </TabBar>
  );
}

export default Footer;
