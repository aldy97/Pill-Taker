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

  const [currentMedicine, setCurrentMedicine] = useState<medicineProps>();

  const [showAddMed, setShowAddMed] = useState(false);

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

  // const inputsAreLegal: () => boolean = () => {
  //   return (
  //     medName !== '' && desc !== '' && doesPerTime !== '' && timesPerDay !== ''
  //   );
  // };

  // const editMedicine = () => {
  //   db.collection(COLLECTION)
  //     .doc(currentMedicine ? currentMedicine.mid : '')
  //     .update({
  //       name: medName,
  //       description: desc,
  //       dose_per_time: parseInt(doesPerTime, 10),
  //       times_per_day: parseInt(timesPerDay, 10),
  //       current_times_remaining: parseInt(timesPerDay, 10),
  //       time_updated: moment().format('YYYY-MM-DD'),
  //     })
  //     .then(fetchData)
  //     .then(() => {
  //       setVisible3(true);
  //     });
  // };

  const handelDeletBtnPress = (mid: string) => {
    setVisible(false);
    db.collection(COLLECTION).doc(mid).delete().then(fetchData);
  };

  const swipeoutBtns = [
    {
      text: 'delete',
      backgroundColor: 'red',
      onPress: () => {
        handelDeletBtnPress(currentMedicine ? currentMedicine.mid : 'error');
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

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
      fetchData={fetchData}
      setShowAddMed={setShowAddMed}
      user={user}
    ></MedDetail>
  ) : (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
      ></FlatList>
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
