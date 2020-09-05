import React, { useState } from 'react';
import TabBar from '@ant-design/react-native/lib/tab-bar';
import Icon from '@ant-design/react-native/lib/icon';
import { Actions } from 'react-native-router-flux';

function Footer() {
  const [scene, setScene] = useState('home');
  return (
    <TabBar
      unselectedTintColor='#949494'
      tintColor='#33A3F4'
      barTintColor='#f5f5f5'
    >
      <TabBar.Item
        title='Home'
        icon={<Icon name='account-book' size='md' />}
        onPress={() => {
          if (scene !== 'home') {
            Actions.home();
            setScene('home');
          }
        }}
      ></TabBar.Item>
      <TabBar.Item
        title='Edit'
        icon={<Icon name='account-book' size='md' />}
        onPress={() => {
          if (scene !== 'edit') {
            Actions.edit();
            setScene('edit');
          }
        }}
      ></TabBar.Item>
      <TabBar.Item
        title='Notification'
        onPress={() => {
          if (scene !== 'notification') {
            Actions.notification();
            setScene('notification');
          }
        }}
        icon={<Icon name='account-book' size='md' />}
      ></TabBar.Item>
      <TabBar.Item
        title='Settings'
        icon={<Icon name='account-book' />}
      ></TabBar.Item>
    </TabBar>
  );
}

export default Footer;
