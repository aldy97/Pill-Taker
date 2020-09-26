import React, { useEffect, useState } from 'react';
import ItemEditor from '../itemEditor';
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
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
  },
});

const EditPage = () => {
  const db = firebase.firestore();

  const getDailyReport = async () => {
    const dailyReport = db
      .collection('medicines')
      .where('time_stamp', '>=', 1601001497285)
      .orderBy('time_stamp', 'desc')
      .get();
    return dailyReport;
  };

  const [data, setData] = useState([]);

  //fileds for adding new medicine
  const [medName, setMedName] = useState('');
  const [desc, setDesc] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const [doesPerTime, setDoesPerTime] = useState('');

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

  const onClose = () => {
    setVisible(false);
  };

  const onCloseAddBtn = () => {
    setVisible2(false);
  };

  const handleAddBtnPress = () => {
    setVisible2(true);
  };

  const fetchData = async () => {
    db.collection('medicines')
      .where('time_stamp', '>=', 1601001497285)
      .orderBy('time_stamp', 'desc')
      .get()
      .then((snapshot) => {
        let array: any = [];
        (snapshot as any).forEach((doc: any) => {
          array.push(doc.data());
        });
        setData(array);
      });
  };

  //add data first, then insert auto generated uid into its field
  const addMedicine = () => {
    db.collection('medicines')
      .add({
        name: medName,
        description: desc,
        dose_per_time: parseInt(doesPerTime, 10),
        times_per_day: parseInt(timesPerDay, 10),
        uid: 'xiongfeng007',
        time_stamp: Date.now(),
      })
      .then((snap) => {
        db.collection('medicines').doc(snap.id).update({ uid: snap.id });
      })
      .then(fetchData);
  };

  const editMedicine = () => {
    db.collection('medicines')
      .doc(currentMedicine ? currentMedicine.uid : '')
      .update({
        name: medName,
        description: desc,
        dose_per_time: parseInt(doesPerTime, 10),
        times_per_day: parseInt(timesPerDay, 10),
        time_stamp: Date.now(),
      })
      .then(fetchData);
  };

  const onDelete = (uid: string) => {
    setVisible(false);
    db.collection('medicines').doc(uid).delete().then(fetchData);
  };

  useEffect(() => {
    getDailyReport().then((snapshot) => {
      let array: any = [];
      (snapshot as any).forEach((doc: any) => {
        array.push(doc.data());
        setData(array);
      });
    });
  }, []);

  //for editing existing medicine
  const footerButtons1 = [
    { text: 'Cancel', onPress: () => console.log('get here') },
    {
      text: 'Edit',
      onPress: () => setVisible4(true),
    },
  ];

  //for adding new medicine
  const footerButtons2 = [
    { text: 'Cancel', onPress: () => console.log('cancel') },
    {
      text: 'Confirm',
      onPress: () => {
        addMedicine();
        setToastMsg('Medicine added');
        setVisible3(true);
      },
    },
  ];

  //after medicine has been added/editted
  const footerButton3 = [
    {
      text: 'Ok',
      onPress: () => {
        setVisible3(false);
      },
    },
  ];

  //after editing medicine
  const footerButton4 = [
    {
      text: 'Cancel',
      onPress: () => {
        setVisible4(false);
      },
    },
    {
      text: 'Confirm',
      onPress: () => {
        editMedicine();
        setToastMsg('Medicine editted');
        setVisible4(false);
        setVisible3(true);
      },
    },
  ];

  const swipeoutBtns = [
    {
      text: 'delete',
      backgroundColor: 'red',
      onPress: () => {
        onDelete(currentMedicine ? currentMedicine.uid : 'error');
      },
    },
  ];

  const renderItem = (obj: any) => {
    const item: medicineProps = obj.item;
    return (
      <Swipeout
        right={swipeoutBtns}
        style={{ marginTop: 10 }}
        backgroundColor='#fff'
        autoClose
        onOpen={() => {
          setCurrentMedicine(item);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
            setCurrentMedicine(item);
          }}
        >
          <ItemEditor medicine={item} style={{ height: 400 }}></ItemEditor>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return (
    <View>
      <Button
        style={{
          width: '30%',
          marginRight: 10,
          marginTop: 10,
          alignSelf: 'flex-end',
        }}
        onPress={handleAddBtnPress}
      >
        Add
      </Button>
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
          onPress={() => onDelete(currentMedicine ? currentMedicine.uid : '')}
        >
          Delete
        </Button>
      </Modal>
      <Modal
        title='Enter medicine details'
        style={{ height: 280, marginTop: -100 }}
        popup
        transparent
        onClose={onCloseAddBtn}
        maskClosable
        visible={visible2}
        footer={footerButtons2}
      >
        <View style={{ paddingVertical: 20 }}>
          <TextInput
            placeholder='Add medicine name'
            style={styles.textInput}
            onChangeText={(text: string) => {
              setMedName(text);
            }}
          ></TextInput>
          <TextInput
            placeholder='Add medicine description'
            style={styles.textInput}
            onChangeText={(text: string) => {
              setDesc(text);
            }}
          ></TextInput>
          <TextInput
            keyboardType='numeric'
            placeholder='Add times per day'
            onChangeText={(text: string) => {
              setTimesPerDay(text);
            }}
            style={styles.textInput}
          ></TextInput>
          <TextInput
            keyboardType='numeric'
            placeholder='Add does per time'
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
        style={{ height: 280, marginTop: -100 }}
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
              currentMedicine ? `${currentMedicine.times_per_day}` : ''
            }
            onChangeText={(text: string) => {
              setTimesPerDay(text);
            }}
            style={styles.textInput}
          ></TextInput>
          <TextInput
            keyboardType='numeric'
            defaultValue={
              currentMedicine ? `${currentMedicine.dose_per_time}` : ''
            }
            style={{ ...styles.textInput, marginBottom: -40 }}
            onChangeText={(text: string) => {
              setDoesPerTime(text);
            }}
          ></TextInput>
        </View>
      </Modal>
    </View>
  );
};

export default (props: any) => (
  <Provider>
    <EditPage />
  </Provider>
);
