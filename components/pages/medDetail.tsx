import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import { medicineProps } from './home';
import moment from 'moment';
import { connect } from 'react-redux';
import { handleAddBtnPress } from '../store/ActionsCreator.js';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

//when the component is mounted due to add a new one, medicine props wont be received.
type medDetailProps = {
  user: Google.GoogleUser;
  medicine?: medicineProps;
  toogle?: any;
  setShowEditMed?: any;
  fetchData?: any;
  fetchHomeData?: any;
};

function MedDetail({
  medicine,
  user,
  toogle,
  setShowEditMed,
  fetchData,
  fetchHomeData,
}: medDetailProps) {
  const db = firebase.firestore();
  const COLLECTION = user.name ? user.name : '';

  //only used when a medicine is being edited
  const [editable, setEditable] = useState(medicine ? false : true);

  //shared by both add med and edit med, initialized as med's current state if it is being edited
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

  const inputsAreLegal: () => boolean = () => {
    return (
      name !== '' && desc !== '' && doesPerTime !== '' && timesPerDay !== ''
    );
  };

  const handleAddBtnPress = () => {
    console.log([name, desc, doesPerTime, timesPerDay, COLLECTION]);
    toogle(false);
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
          fetchHomeData;
        });
    }
  };

  const editMedicine = () => {
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
      .then(fetchData);
  };

  const handleConfirmEditBtnPress = () => {
    setShowEditMed(false);
    editMedicine();
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
      <WhiteSpace size='lg' />
      {medicine && (
        <Button
          onPress={() => {
            editable ? handleConfirmEditBtnPress() : setEditable(true);
          }}
        >
          {editable ? 'Confirm edit' : 'Edit this medicine'}
        </Button>
      )}
      <WhiteSpace size='lg' />
      {/* <Button type='primary' disabled>
        Add alarms
      </Button> */}
      <WhiteSpace size='lg' />
      {!medicine && <Button onPress={handleAddBtnPress}>Confirm</Button>}
    </ScrollView>
  );
}

const mapDispatch = (dispatch: any) => ({
  toogle(addModalOpen: boolean) {
    const action = handleAddBtnPress(addModalOpen);
    dispatch(action);
  },
});

export default connect(null, mapDispatch)(MedDetail);
