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
  return (
    <Modal
      title='Title'
      transparent
      onClose={onClose}
      maskClosable
      visible={visible}
      closable
      footer={footerButtons}
    >
      <View style={{ paddingVertical: 20 }}>
        <Text style={{ textAlign: 'center' }}>Content...</Text>
        <Text style={{ textAlign: 'center' }}>Content...</Text>
      </View>
      <Button type='primary' onPress={onClose}>
        close modal
      </Button>
    </Modal>
  );
}

export default () => (
  <Provider>
    <Settings />
  </Provider>
);
