import React, { useState } from 'react';
import ItemEditor, { ItemProps } from '../itemEditor';
import medList from '../../mock/medList';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import Modal from '@ant-design/react-native/lib/modal';
import Button from '@ant-design/react-native/lib/button';
import Provider from '@ant-design/react-native/lib/provider';

//Second section in the footer: allows users to edit his/her perscription
function Edit() {
  const renderItem = (obj: any) => {
    const item: ItemProps = obj.item;
    return (
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          setCurrentMedicine(item);
        }}
      >
        <ItemEditor medicine={item} name={item.name} number={item.number}></ItemEditor>
      </TouchableOpacity>
    );
  };

  const [visible, setVisible] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<any>(null);
  const onClose = () => {
    setVisible(false);
  };
  const footerButtons = [
    { text: 'Cancel', onPress: () => console.log('cancel') },
    { text: 'Confirm', onPress: () => console.log('ok') },
  ];

  return (
    <View>
      <FlatList
        data={medList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
      <Modal
        title={currentMedicine ? currentMedicine.name : ""}
        transparent
        onClose={onClose}
        maskClosable
        visible={visible}
        closable
        footer={footerButtons}
      >
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ textAlign: 'center' }}>{currentMedicine ? currentMedicine.name : ""}</Text>
          <Text style={{ textAlign: 'center' }}>{currentMedicine ? currentMedicine.number : ""}</Text>
        </View>
        <Button type='primary' onPress={onClose}>
          close modal
        </Button>
      </Modal>
    </View>
  );
}

export default () => (
  <Provider>
    <Edit />
  </Provider>
);
