import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import { medicineProps } from './home';
import moment from 'moment';
import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import { connect } from 'react-redux';
import { handleAddBtnPress } from '../store/ActionsCreator.js';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { Actions } from 'react-native-router-flux';

type editOneMedProps = {
  user: Google.GoogleUser;
  medicine?: medicineProps; //medicine is received from redux
};

function EditOneMed({ user, medicine }: editOneMedProps) {
  const db = firebase.firestore();
  const COLLECTION = user.name ? user.name : '';

  const [editable, setEditable] = useState(false);

  const [name, setName] = useState<string>(medicine ? medicine.name : '');
  const [desc, setDesc] = useState<string>(
    medicine ? medicine.description : ''
  );
  const [doesPerTime, setDoesPerTime] = useState<string>(
    medicine ? medicine.dose_per_time.toString() : ''
  );
  const [timesPerDay, setTimesPerDay] = useState<string>(
    medicine ? medicine.times_per_day.toString() : ''
  );

  //except for description, every single field of med can not be null
  const inputsAreLegal: () => boolean = () => {
    return name !== '' && doesPerTime !== '' && timesPerDay !== '';
  };

  const handleConfirmEditBtnPress = () => {
    if (inputsAreLegal()) {
      db.collection(COLLECTION)
        .doc(medicine ? medicine.mid : '')
        .update({
          name: name,
          description: desc,
          dose_per_time: parseInt(doesPerTime, 10),
          times_per_day: parseInt(timesPerDay, 10),
          current_times_remaining: parseInt(timesPerDay, 10),
          time_updated: moment().format('YYYY-MM-DD'),
        })
        .then(() => {
          Actions.edit();
        });
    }
  };

  const deleteMedicine = () => {
    db.collection(COLLECTION)
      .doc(medicine ? medicine.mid : '')
      .delete()
      .then(() => {
        Actions.edit();
      });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#eee' }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <List renderHeader='Name:'>
        <InputItem
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
          editable={editable}
          onChange={(value: string) => {
            console.log(value);
          }}
          defaultValue={medicine ? medicine.description : ''}
          placeholder={medicine ? '' : 'Enter description (optional)'}
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
            console.log(doesPerTime);
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
            console.log(timesPerDay);
          }}
        ></TextInput>
      </List>
      <WhiteSpace size='sm' />
      <View>
        <Button
          type='primary'
          style={{ borderRadius: 0 }}
          onPress={() => {
            editable ? handleConfirmEditBtnPress() : setEditable(true);
          }}
        >
          {editable ? 'Confirm edit' : 'Edit this medicine'}
        </Button>
        <WhiteSpace size='sm' />

        <WhiteSpace size='xs' />
        <Button
          type='warning'
          style={{ borderRadius: 0 }}
          onPress={deleteMedicine}
        >
          Delete
        </Button>
      </View>
      <WhiteSpace size='xs' />
    </ScrollView>
  );
}

export default EditOneMed;
