import React, { useEffect, useState } from 'react';
import ItemEditor from '../itemEditor';
import { handleAddBtnPress } from '../store/ActionsCreator.js';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { medicineProps } from './home';
import Swipeout from 'react-native-swipeout';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import MedDetail from './medDetail';

type EditPageProps = {
  user: Google.GoogleUser;
};

const EditPage = ({ user }: EditPageProps) => {
  const db = firebase.firestore();
  const COLLECTION = user.name ? user.name : '';

  const [data, setData] = useState([]);

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

  const handelDeletBtnPress = (mid: string) => {
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

export default EditPage;
