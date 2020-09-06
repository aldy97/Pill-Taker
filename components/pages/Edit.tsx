import React, { useEffect, useState } from 'react';
import ItemEditor, { ItemProps } from '../itemEditor';
import medList from '../../mock/medList';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Modal from '@ant-design/react-native/lib/modal';
import Button from '@ant-design/react-native/lib/button';
import Provider from '@ant-design/react-native/lib/provider';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
  },
});

type editProps = {
  user: any;
};
//Second section in the footer: allows users to edit his/her perscription
function Edit({ user }: editProps) {
  const db = firebase.firestore();
  const getDailyReport = async () => {
    const dailyReport = db
      .collection('medicines')
      .where('uid', '==', 'xiongfeng007')
      .get();
    return dailyReport;
  };

  const [data, setData] = useState([]);

  const [medName, setMedName] = useState('');
  const [desc, setDesc] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const [doesPerTime, setDoesPerTime] = useState('');

  useEffect(() => {
    getDailyReport().then((snapshot) => {
      (snapshot as any).forEach((doc: any) => {
        setData(doc.data());
      });
    });
    console.log(data);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const renderItem = (obj: any) => {
    const item: ItemProps = obj.item;
    return (
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          setCurrentMedicine(item);
        }}
      >
        <ItemEditor
          medicine={item}
          name={item.name}
          number={item.number}
        ></ItemEditor>
      </TouchableOpacity>
    );
  };
  //modal for edit medicine
  const [visible, setVisible] = useState(false);
  //modal for add a new medicine
  const [visible2, setVisible2] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<any>(null);
  const onClose = () => {
    setVisible(false);
  };

  const onCloseAddBtn = () => {
    setVisible2(false);
  };

  const handleAddBtnPress = () => {
    setVisible2(true);
  };

  //for editing existing medicine
  const footerButtons1 = [
    { text: 'Cancel', onPress: () => console.log('cancel') },
    {
      text: 'Confirm',
      onPress: () => {},
    },
  ];

  type medicine = {
    name: string;
    desc: string;
    doesPerTime: number;
    timesPerDay: number;
  };

  const setMedicine = (
    id: string,
    { name, desc, doesPerTime, timesPerDay }: medicine
  ) => {
    db.collection('medicines').doc(id).set({
      name: name,
      description: desc,
      dose_per_time: doesPerTime,
      times_per_day: timesPerDay,
      uid: 'xiongfeng007',
    });
  };

  const addMedicine = () => {
    db.collection('medicines')
      .add({
        name: medName,
        description: desc,
        dose_per_time: parseInt(doesPerTime, 10),
        times_per_day: parseInt(timesPerDay, 10),
        uid: 'xiongfeng007',
      })
      .then(async () => {
        db.collection('medicines')
          .get()
          .then((snapshot) => {
            (snapshot as any).forEach((doc: any) => {
              setData(data.concat(doc.data()));
            });
          });
      });
  };

  //for creating unadded medicine
  const footerButtons2 = [
    { text: 'Cancel', onPress: () => console.log('cancel') },
    {
      text: 'Confirm',
      onPress: () => addMedicine(),
    },
  ];

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
        data={medList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
      <Modal
        title={currentMedicine ? currentMedicine.name : ''}
        transparent
        onClose={onClose}
        maskClosable
        visible={visible}
        closable
        footer={footerButtons1}
      >
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ textAlign: 'center' }}>
            {currentMedicine ? currentMedicine.name : ''}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {currentMedicine ? currentMedicine.number : ''}
          </Text>
        </View>
        <Button type='primary' onPress={onClose}>
          close modal
        </Button>
      </Modal>
      <Modal
        title={currentMedicine ? currentMedicine.name : ''}
        transparent
        onClose={onCloseAddBtn}
        maskClosable
        visible={visible2}
        closable
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
          <Text style={{ textAlign: 'center' }}>
            {currentMedicine ? currentMedicine.number : ''}
          </Text>
        </View>
      </Modal>
    </View>
  );
}

export default (props: any) => (
  <Provider>
    <Edit user={props.user} />
  </Provider>
);
