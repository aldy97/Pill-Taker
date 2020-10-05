import React, { useEffect, useState } from 'react';
import ItemEditor from '../itemEditor';
import { handleAddBtnPress } from '../store/ActionsCreator.js';
import { connect } from 'react-redux';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { medicineProps } from './home';
import Swipeout from 'react-native-swipeout';
import Modal from '@ant-design/react-native/lib/modal';
import Button from '@ant-design/react-native/lib/button';
import Provider from '@ant-design/react-native/lib/provider';
import moment from 'moment';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import MedDetail from './medDetail';

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
  },
});

type EditPageProps = {
  addModalOpen: boolean;
  user: Google.GoogleUser;
  toogle?: any;
};

const EditPage = ({ addModalOpen, user, toogle }: EditPageProps) => {
  const db = firebase.firestore();
  const COLLECTION = user.name ? user.name : '';

  const [data, setData] = useState([]);

  //fileds for adding new medicine
  const [medName, setMedName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [timesPerDay, setTimesPerDay] = useState<string>('');
  const [doesPerTime, setDoesPerTime] = useState<string>('');

  //showing med detail
  const [visible, setVisible] = useState(false);
  //modal for add a new medicine
  const [visible2, setVisible2] = useState(false);
  //Adding med confirmation
  const [visible3, setVisible3] = useState(false);
  //editting an added medication
  const [visible4, setVisible4] = useState(false);

  const [currentMedicine, setCurrentMedicine] = useState<medicineProps>();

  const [toastMsg, setToastMsg] = useState<String>();

  const [showAddMed, setShowAddMed] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const onCloseAddBtn = () => {
    setVisible2(false);
  };

  const resetStatus: () => void = () => {
    setMedName('');
    setDesc('');
    setTimesPerDay('');
    setDoesPerTime('');
  };

  const fetchData = async () => {
    db.collection(COLLECTION)
      .get()
      .then((snapshot) => {
        let array: any = [];
        (snapshot as any).forEach((doc: any) => {
          array.push(doc.data());
        });
        setData(array);
      });
  };

  const inputsAreLegal: () => boolean = () => {
    return (
      medName !== '' && desc !== '' && doesPerTime !== '' && timesPerDay !== ''
    );
  };

  //add data first, then insert auto generated mid into its field
  const addMedicine = () => {
    if (inputsAreLegal()) {
      setToastMsg('Medicine added');
      //update collection medicine
      db.collection(COLLECTION)
        .add({
          name: medName,
          description: desc,
          dose_per_time: parseInt(doesPerTime, 10),
          times_per_day: parseInt(timesPerDay, 10),
          current_times_remaining: parseInt(timesPerDay, 10),
          time_created: moment().format('YYYY-MM-DD'),
        })
        .then((snap) => {
          db.collection(COLLECTION).doc(snap.id).update({ mid: snap.id });
        })
        .then(fetchData)
        .then(() => {
          setVisible3(true);
        });
    } else {
      //if inputs are not legal, then show error message modal
      setToastMsg('Please fill every field');
      setVisible3(true);
    }
  };

  const editMedicine = () => {
    db.collection(COLLECTION)
      .doc(currentMedicine ? currentMedicine.mid : '')
      .update({
        name: medName,
        description: desc,
        dose_per_time: parseInt(doesPerTime, 10),
        times_per_day: parseInt(timesPerDay, 10),
        current_times_remaining: parseInt(timesPerDay, 10),
        time_updated: moment().format('YYYY-MM-DD'),
      })
      .then(fetchData)
      .then(() => {
        setVisible3(true);
      });
  };

  const onDelete = (mid: string) => {
    setVisible(false);
    db.collection(COLLECTION).doc(mid).delete().then(fetchData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //for editing existing medicine
  const footerButtons1 = [
    { text: 'Cancel', onPress: () => resetStatus() },
    {
      text: 'Edit',
      onPress: () => {
        setMedName(currentMedicine ? currentMedicine.name : '');
        setDesc(currentMedicine ? currentMedicine.description : '');
        setDoesPerTime(
          currentMedicine ? currentMedicine.dose_per_time.toString() : ''
        );
        setTimesPerDay(
          currentMedicine ? currentMedicine.times_per_day.toString() : ''
        );
        setVisible4(true);
      },
    },
  ];

  //for adding new medicine
  const footerButtons2 = [
    {
      text: 'Cancel',
      onPress: () => {
        resetStatus();
        toogle(!addModalOpen);
      },
    },
    {
      text: 'Confirm',
      onPress: () => {
        toogle(!addModalOpen);
        addMedicine();
        resetStatus();
      },
    },
  ];

  //after medicine has been added/editted
  const footerButton3 = [
    {
      text: 'Ok',
      onPress: () => {
        setVisible3(false);
        resetStatus();
      },
    },
  ];

  //after editing medicine
  const footerButton4 = [
    {
      text: 'Cancel',
      onPress: () => {
        resetStatus();
        setVisible4(false);
      },
    },
    {
      text: 'Confirm',
      onPress: () => {
        editMedicine();
        setToastMsg('Medicine editted');
        setVisible4(false);
        resetStatus();
      },
    },
  ];

  const swipeoutBtns = [
    {
      text: 'delete',
      backgroundColor: 'red',
      onPress: () => {
        onDelete(currentMedicine ? currentMedicine.mid : 'error');
      },
    },
  ];

  const renderItem = (obj: any) => {
    const item: medicineProps = obj.item;
    return (
      <Swipeout
        right={swipeoutBtns}
        backgroundColor='#fff'
        close={currentMedicine ? currentMedicine.mid !== item.mid : false}
        autoClose
        onOpen={() => {
          setCurrentMedicine(item);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentMedicine(item);
            setShowAddMed(true);
          }}
        >
          <ItemEditor medicine={item} style={{ height: 400 }}></ItemEditor>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return showAddMed ? (
    <MedDetail
      medicine={currentMedicine}
      deleteMedicine={onDelete}
      setShowAddMed={setShowAddMed}
    ></MedDetail>
  ) : (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
      ></FlatList>
      <Modal
        title={currentMedicine ? currentMedicine.name : ''}
        transparent
        style={{ height: 250, width: 350 }}
        onClose={onClose}
        maskClosable
        visible={visible}
        footer={footerButtons1}
      >
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ textAlign: 'center' }}>
            Description: {currentMedicine ? currentMedicine.description : ''}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Does per time:{' '}
            {currentMedicine ? currentMedicine.dose_per_time : ''}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Time per day: {currentMedicine ? currentMedicine.times_per_day : ''}
          </Text>
        </View>
        <Button
          type='warning'
          style={{ backgroundColor: 'red', borderColor: 'red' }}
          onPress={() => onDelete(currentMedicine ? currentMedicine.mid : '')}
        >
          Delete
        </Button>
      </Modal>
      <Modal
        title='Enter medicine details'
        style={{ height: 280, marginTop: -150 }}
        popup
        transparent
        onClose={onCloseAddBtn}
        maskClosable
        visible={addModalOpen}
        footer={footerButtons2}
      >
        <View style={{ paddingVertical: 20 }}>
          <TextInput
            placeholder='Medicine name'
            style={styles.textInput}
            onChangeText={(text: string) => {
              setMedName(text);
            }}
          ></TextInput>
          <TextInput
            placeholder='Medicine description'
            style={styles.textInput}
            onChangeText={(text: string) => {
              setDesc(text);
            }}
          ></TextInput>
          <TextInput
            keyboardType='numeric'
            placeholder='Times per day'
            onChangeText={(text: string) => {
              setTimesPerDay(text);
            }}
            style={styles.textInput}
          ></TextInput>
          <TextInput
            keyboardType='numeric'
            placeholder='Does per time'
            style={{ ...styles.textInput, marginBottom: -40 }}
            onChangeText={(text: string) => {
              setDoesPerTime(text);
            }}
          ></TextInput>
        </View>
      </Modal>
      <Modal
        title={`${toastMsg}`}
        transparent
        onClose={() => setVisible3(false)}
        maskClosable
        visible={visible3}
        footer={footerButton3}
      ></Modal>
      <Modal
        title='Edit medicine'
        style={{ height: 280, marginTop: -150 }}
        popup
        transparent
        onClose={onCloseAddBtn}
        maskClosable
        visible={visible4}
        footer={footerButton4}
      >
        <View style={{ paddingVertical: 20 }}>
          <TextInput
            defaultValue={currentMedicine ? currentMedicine.name : 'error'}
            style={styles.textInput}
            onChangeText={(text: string) => {
              setMedName(text);
            }}
          ></TextInput>
          <TextInput
            defaultValue={
              currentMedicine ? currentMedicine.description : 'error'
            }
            style={styles.textInput}
            onChangeText={(text: string) => {
              setDesc(text);
            }}
          ></TextInput>
          <TextInput
            keyboardType='numeric'
            defaultValue={
              currentMedicine ? `${currentMedicine.dose_per_time}` : ''
            }
            style={styles.textInput}
            onChangeText={(text: string) => {
              setDoesPerTime(text);
            }}
          ></TextInput>
          <TextInput
            keyboardType='numeric'
            defaultValue={
              currentMedicine ? `${currentMedicine.times_per_day}` : ''
            }
            onChangeText={(text: string) => {
              setTimesPerDay(text);
            }}
            style={{ ...styles.textInput, marginBottom: -40 }}
          ></TextInput>
        </View>
      </Modal>
    </View>
  );
};

const mapState = (state: any) => {
  return {
    addModalOpen: state.getIn(['reducer', 'addModalOpen']),
  };
};

const mapDispatch = (dispatch) => ({
  toogle(addModalOpen: boolean) {
    const action = handleAddBtnPress(addModalOpen);
    dispatch(action);
  },
});

export default connect(
  mapState,
  mapDispatch
)(({ addModalOpen, toogle, user }: EditPageProps) => (
  <Provider>
    <EditPage addModalOpen={addModalOpen} toogle={toogle} user={user} />
  </Provider>
));
