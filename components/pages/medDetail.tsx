import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import moment from 'moment';
import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

type medDetailProps = {
  user: string;
};

//scene for adding new med
function MedDetail({ user }: medDetailProps) {
  const db = firebase.firestore();
  const COLLECTION = user ? user : '';

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  //shared by both add med and edit med, initialized as med's current state if it is being edited
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [doesPerTime, setDoesPerTime] = useState<string>('');
  const [timesPerDay, setTimesPerDay] = useState<string>('');

  //except for description, every single field of med can not be null
  const inputsAreLegal: () => boolean = () => {
    return name !== '' && doesPerTime !== '' && timesPerDay !== '';
  };

  const handleAddBtnPress = () => {
    if (inputsAreLegal() && COLLECTION) {
      db.collection(COLLECTION)
        .add({
          name: name,
          description: desc,
          dose_per_time: parseInt(doesPerTime, 10),
          times_per_day: parseInt(timesPerDay, 10),
          current_times_remaining: parseInt(timesPerDay, 10),
          time_created: moment().format('YYYY-MM-DD'),
          time_updated: moment().format('YYYY-MM-DD'),
        })
        .then((snap) => {
          db.collection(COLLECTION).doc(snap.id).update({ mid: snap.id });
        })
        .then(() => {
          Actions.home();
        });
    } else {
      setShowErrorModal(true);
    }
  };

  const errorModalButtons = [
    {
      text: 'Ok',
      onPress: () => {
        setShowErrorModal(false);
      },
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#eee' }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Modal
        title='Please fill missing fields'
        transparent
        maskClosable
        visible={showErrorModal}
        closable={false}
        footer={errorModalButtons}
      ></Modal>
      <List renderHeader='Name:'>
        <InputItem
          editable
          onChange={(value: string) => {
            console.log(value);
          }}
          placeholder={'Enter name'}
          onChangeText={(text: string) => {
            setName(text);
          }}
        ></InputItem>
      </List>
      <List renderHeader='Description:'>
        <InputItem
          editable
          onChange={(value: string) => {
            console.log(value);
          }}
          placeholder={'Enter description (optional)'}
          onChangeText={(text: string) => {
            setDesc(text);
          }}
        ></InputItem>
      </List>
      <List renderHeader='Does per time:'>
        <TextInput
          editable
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          placeholder={'Enter does per time'}
          onChangeText={(text: string) => {
            setDoesPerTime(text);
            console.log(doesPerTime);
          }}
        ></TextInput>
      </List>
      <List renderHeader='Times per day:'>
        <TextInput
          editable
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          placeholder={'Enter times per day'}
          onChangeText={(text: string) => {
            setTimesPerDay(text);
            console.log(timesPerDay);
          }}
        ></TextInput>
      </List>
      <WhiteSpace size='xs' />
      <Button
        type='primary'
        style={{ borderRadius: 0 }}
        onPress={handleAddBtnPress}
      >
        Confirm
      </Button>
    </ScrollView>
  );
}

export default ({ user }: medDetailProps) => (
  <Provider>
    <MedDetail user={user} />
  </Provider>
);
