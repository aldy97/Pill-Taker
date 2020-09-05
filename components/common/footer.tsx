import React from 'react';
import TabBar from '@ant-design/react-native/lib/tab-bar';
import Icon from '@ant-design/react-native/lib/icon';
import { Actions } from 'react-native-router-flux';

type footerProps = {
  selected: number;
  setSelected: any;
};

function Footer({ selected, setSelected }: footerProps) {
  return (
    <TabBar
      unselectedTintColor='#949494'
      tintColor='#33A3F4'
      barTintColor='#f5f5f5'
    >
      <TabBar.Item
        title='Home'
        onPress={() => {
          Actions.home();
        }}
      ></TabBar.Item>
      <TabBar.Item
        title='Recent'
        onPress={() => {
          Actions.recent();
        }}
      ></TabBar.Item>
      <TabBar.Item title='Notification'></TabBar.Item>
      <TabBar.Item title='Settings'></TabBar.Item>
    </TabBar>
  );
}

export default Footer;
