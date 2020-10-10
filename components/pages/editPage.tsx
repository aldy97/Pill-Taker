import React, { useEffect, useState } from 'react';
import ItemEditor from '../itemEditor';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { medicineProps } from './home';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setMedicine } from '../store/ActionsCreator';

type EditPageProps = {
  user: Google.GoogleUser;
  handleItemPress?: any;
};

const EditPage = ({ user, handleItemPress }: EditPageProps) => {
  const db = firebase.firestore();
  const COLLECTION = user.id ? user.id : '';

  const [data, setData] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = (obj: any) => {
    const item: medicineProps = obj.item;
    return (
      <TouchableOpacity
        onPress={() => {
          handleItemPress(item);
          Actions.editOneMed();
        }}
      >
        <ItemEditor medicine={item} style={{ height: 400 }}></ItemEditor>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
      ></FlatList>
    </View>
  );
};

const mapDispatch = (dispatch: any) => ({
  handleItemPress(medicine: medicineProps) {
    const action = setMedicine(medicine);
    dispatch(action);
  },
});

export default connect(null, mapDispatch)(EditPage);
