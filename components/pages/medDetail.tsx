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

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);

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

  //except for description, every single field of med can not be null
  const inputsAreLegal: () => boolean = () => {
    return name !== '' && doesPerTime !== '' && timesPerDay !== '';
  };

  const handleAddBtnPress = () => {
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
          time_updated: moment().format('YYYY-MM-DD'),
        })
        .then((snap) => {
          db.collection(COLLECTION).doc(snap.id).update({ mid: snap.id });
        })
        .then(fetchHomeData);
    }
  };

  const editMedicine = () => {
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
        .then(fetchData)
        .then(() => {
          setShowEditMed(false);
        });
    } else {
      setShowErrorModal(true);
    }
  };

  const deleteMedicine = () => {
    db.collection(COLLECTION)
      .doc(medicine ? medicine.mid : '')
      .delete()
      .then(fetchData)
      .then(() => {
        setShowEditMed(false);
      });
  };

  const handleConfirmEditBtnPress = () => {
    editMedicine();
  };

  const deleteWarningModalButtons = [
    {
      text: 'Cancel',
      onPress: () => {
        setShowDeleteWarningModal(false);
      },
    },
    {
      text: 'Confirm',
      onPress: () => {
        deleteMedicine();
      },
    },
  ];

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
      <Modal
        title='Sure you want to delete this?'
        transparent
        maskClosable
        visible={showDeleteWarningModal}
        closable={false}
        footer={deleteWarningModalButtons}
      ></Modal>
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
      <WhiteSpace size='sm' />
      {medicine && (
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
          <Button
            style={{ borderRadius: 0 }}
            onPress={() => {
              setShowEditMed(false);
            }}
          >
            Cancel
          </Button>
          <WhiteSpace size='xs' />
          <Button
            type='warning'
            style={{ borderRadius: 0 }}
            onPress={() => {
              setShowDeleteWarningModal(true);
            }}
          >
            Delete
          </Button>
        </View>
      )}
      <WhiteSpace size='xs' />
      {!medicine && (
        <Button type='primary' onPress={handleAddBtnPress}>
          Confirm
        </Button>
      )}
    </ScrollView>
  );
}

const mapDispatch = (dispatch: any) => ({
  toogle(addModalOpen: boolean) {
    const action = handleAddBtnPress(addModalOpen);
    dispatch(action);
  },
});

export default connect(
  null,
  mapDispatch
)(
  ({
    medicine,
    user,
    toogle,
    setShowEditMed,
    fetchData,
    fetchHomeData,
  }: medDetailProps) => (
    <Provider>
      <MedDetail
        user={user}
        medicine={medicine}
        toogle={toogle}
        setShowEditMed={setShowEditMed}
        fetchData={fetchData}
        fetchHomeData={fetchHomeData}
      />
    </Provider>
  )
);
