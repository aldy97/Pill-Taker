import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import { medicineProps } from './home';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

type medDetailProps = {
  medicine?: medicineProps;
  deleteMedicine?: any;
  setShowAddMed?: any;
  user: Google.GoogleUser;
};

function MedDetail({ medicine, setShowAddMed, user }: medDetailProps) {
  const db = firebase.firestore();
  const COLLECTION = user.name ? user.name : '';

  const [editable, setEditable] = useState(medicine ? false : true);

  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [doesPerTime, setDoesPerTime] = useState<string>('');
  const [timesPerDay, setTimesPerDay] = useState<string>('');

  const inputsAreLegal: () => boolean = () => {
    return (
      name !== '' && desc !== '' && doesPerTime !== '' && timesPerDay !== ''
    );
  };

  const handleAddBtnPress = () => {
    console.log([name, desc, doesPerTime, timesPerDay, COLLECTION]);
    if (inputsAreLegal() && COLLECTION) {
      db.collection(COLLECTION)
        .add({
          name: name,
          description: desc,
          dose_per_time: parseInt(doesPerTime, 10),
          times_per_day: parseInt(timesPerDay, 10),
          current_times_remaining: parseInt(timesPerDay, 10),
          time_created: moment().format('YYYY-MM-DD'),
        })
        .then((snap) => {
          db.collection(COLLECTION).doc(snap.id).update({ mid: snap.id });
        })
        .then(() => {
          Actions.home();
        });
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <List renderHeader='Name:'>
        <InputItem
          clear
          editable={editable}
          onChange={(value: string) => {
            console.log(value);
          }}
          defaultValue={medicine ? medicine.name : ''}
          placeholder={medicine ? medicine.name : 'Enter name'}
          onChangeText={(text: string) => {
            setName(text);
          }}
        ></InputItem>
      </List>
      <List renderHeader='Description:'>
        <InputItem
          clear
          editable={editable}
          onChange={(value: string) => {
            console.log(value);
          }}
          defaultValue={medicine ? medicine.description : ''}
          placeholder={medicine ? '' : 'Enter description'}
          onChangeText={(text: string) => {
            setDesc(text);
          }}
        ></InputItem>
      </List>
      <List renderHeader='Does per time:'>
        <TextInput
          editable={editable}
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          defaultValue={medicine ? medicine.dose_per_time.toString() : ''}
          placeholder={medicine ? '' : 'Enter does per time'}
          onChangeText={(text: string) => {
            setDoesPerTime(text);
          }}
        ></TextInput>
      </List>
      <List renderHeader='Times per day:'>
        <TextInput
          editable={editable}
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          defaultValue={medicine ? medicine.times_per_day.toString() : ''}
          placeholder={medicine ? '' : 'Enter times per day'}
          onChangeText={(text: string) => {
            setTimesPerDay(text);
          }}
        ></TextInput>
      </List>
      <WhiteSpace size='lg' />
      {medicine ? (
        <Button
          onPress={() => {
            editable ? setShowAddMed(false) : setEditable(true);
          }}
        >
          {editable ? 'confirm' : 'Edit this medicine'}
        </Button>
      ) : (
        <View></View>
      )}
      <WhiteSpace size='lg' />
      <Button type='primary' disabled>
        Add alarms
      </Button>
      <WhiteSpace size='lg' />
      {medicine ? (
        <View></View>
      ) : (
        <Button onPress={handleAddBtnPress}>Confirm</Button>
      )}
    </ScrollView>
  );
}

export default MedDetail;
