import React, { useState, useEffect } from 'react';
import Switch from '@ant-design/react-native/lib/switch';
import Swipeout from 'react-native-swipeout';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { handleShowTimePickerBtnPress } from '../store/ActionsCreator.js';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  style: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
  },
});

type alarmProps = {
  time: string;
  desc: string;
  id: string;
  notification_on: boolean;
};

type notificationProps = {
  user: Google.GoogleUser;
  showTimePicker?: boolean;
  toogleTimePicker: any;
};

function Notification({
  user,
  showTimePicker,
  toogleTimePicker,
}: notificationProps) {
  const [showNotification, setShowNotification] = useState(true);
  const [data, setData] = useState([]);
  const [alarmSelected, setAlarmSelected] = useState<alarmProps>();
  const [showAddNotesModal, setShowAddNotesModal] = useState<boolean>(false);

  const COLLECTION = user.name ? user.name + ' Alarms' : 'error';
  const db = firebase.firestore();

  const getAlarms = async () => {
    const alarms = db.collection(COLLECTION).get();
    return alarms;
  };

  const fetchData = async () => {
    db.collection(COLLECTION)
      .get()
      .then((snapshot) => {
        let array: any = [];
        (snapshot as any).forEach((doc: any) => {
          array.push(doc.data());
          setData(array);
        });
      });
  };

  useEffect(() => {
    getAlarms().then((snapshot) => {
      let array: any = [];
      (snapshot as any).forEach((doc: any) => {
        array.push(doc.data());
        setData(array);
      });
    });
  }, []);

  useEffect(() => {
    console.log(data);
  });

  const handleConfirm = (date: any) => {
    db.collection(COLLECTION)
      .add({
        time: date.toString(),
        notification_on: true,
      })
      .then((snap) => {
        db.collection(COLLECTION).doc(snap.id).update({ id: snap.id });
      })
      .then(fetchData)
      .then(() => {
        toogleTimePicker(false);
      });
  };

  const onDelete = (id: string) => {
    db.collection(COLLECTION).doc(id).delete().then(fetchData);
  };

  const swipeoutBtns = [
    {
      text: 'delete',
      backgroundColor: 'red',
      onPress: () => {
        onDelete(alarmSelected ? alarmSelected.id : 'error');
      },
    },
  ];

  const renderItem = (obj: any) => {
    const item: alarmProps = obj.item;
    const time: string = item.time.split(' ')[4];
    return (
      <Swipeout
        right={swipeoutBtns}
        backgroundColor='#fff'
        close={alarmSelected ? alarmSelected.id !== item.id : false}
        autoClose
        onOpen={() => {
          setAlarmSelected(item);
        }}
      >
        <View style={styles.style}>
          <Text style={{ fontSize: 24 }}>{time}</Text>
          <Switch
            checked={showNotification}
            onChange={() => {
              setShowNotification(!showNotification);
            }}
          ></Switch>
        </View>
      </Swipeout>
    );
  };

  return (
    <View>
      <View
        style={{
          marginBottom: 20,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 10,
          paddingRight: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <Text style={{ fontSize: 24 }}>
          Turn all notifications {showNotification ? 'off' : 'on'}
        </Text>
        <Switch
          checked={showNotification}
          onChange={() => {
            setShowNotification(!showNotification);
          }}
        ></Switch>
      </View>
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode='time'
        onConfirm={handleConfirm}
        onCancel={() => {
          toogleTimePicker(false);
        }}
      />
      <FlatList
        data={data}
        ListEmptyComponent={
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', marginTop: 100 }}>
              No Alarms Yet
            </Text>
          </View>
        }
        renderItem={renderItem}
        keyExtractor={(item: any) => item.key}
      ></FlatList>
    </View>
  );
}

const mapState = (state: any) => {
  return {
    showTimePicker: state.getIn(['reducer', 'showTimePicker']),
  };
};

const mapDispatch = (dispatch: any) => ({
  toogleTimePicker(show: boolean) {
    const action = handleShowTimePickerBtnPress(show);
    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(Notification);
