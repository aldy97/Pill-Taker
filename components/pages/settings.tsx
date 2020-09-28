import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';

function Settings() {
  const [visible, setVisible] = useState(true);
  const onClose = () => {
    setVisible(false);
  };
  const footerButtons = [
    { text: 'Cancel', onPress: () => console.log('cancel') },
    { text: 'Ok', onPress: () => console.log('ok') },
  ];
  return <View></View>;
}

export default () => (
  <Provider>
    <Settings />
  </Provider>
);
