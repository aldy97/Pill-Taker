import React, { useState, useEffect } from 'react';
import Switch from '@ant-design/react-native/lib/switch';
import Modal from '@ant-design/react-native/lib/modal';
import Provider from '@ant-design/react-native/lib/provider';
import Checkbox from '@ant-design/react-native/lib/checkbox';
import Swipeout from 'react-native-swipeout';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { handleShowTimePickerBtnPress } from '../store/ActionsCreator.js';
import { medicineProps } from './home';
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
  //data about alarms
  const [data, setData] = useState([]);

  //data about meds
  const [medData, setMedData] = useState([]);

  const [alarmSelected, setAlarmSelected] = useState<alarmProps>();

  //pops up when a new alarm is set
  const [showAddAlarmSuccModal, setShowAddAlarmSuccModal] = useState(false);

  const [showMedCheckBox, setShowMedCheckBox] = useState<boolean>(true);

  const ALARM_COLLECTION = user.name ? user.name + ' Alarms' : 'error';
  const MED_COLLECTION = user.name ? user.name : 'error';
  const db = firebase.firestore();

  const CheckboxItem = Checkbox.CheckboxItem;

  const fetchData = async () => {
    db.collection(ALARM_COLLECTION)
      .get()
      .then((snapshot) => {
        let array: any = [];
        (snapshot as any).forEach((doc: any) => {
          array.push(doc.data());
        });
        setData(array);
      });
  };

  const fetchMedData = async () => {
    db.collection(MED_COLLECTION)
      .get()
      .then((snapshot) => {
        let array: any = [];
        (snapshot as any).forEach((doc: any) => {
          array.push(doc.data());
        });
        setMedData(array);
      });
  };

  useEffect(() => {
    fetchData();
    fetchMedData();
  }, []);

  //add a new alarm
  const handleConfirm = (date: any) => {
    db.collection(ALARM_COLLECTION)
      .add({
        time: date.toString(),
        notification_on: true,
      })
      .then((snap) => {
        db.collection(ALARM_COLLECTION).doc(snap.id).update({ id: snap.id });
      })
      .then(fetchData)
      .then(() => {
        toogleTimePicker(false);
        setShowAddAlarmSuccModal(true);
      });
  };

  const onDelete = (id: string): void => {
    db.collection(ALARM_COLLECTION).doc(id).delete().then(fetchData);
  };

  const switchNotifications = (id: string, current: boolean): void => {
    db.collection(ALARM_COLLECTION)
      .doc(id)
      .update({ notification_on: !current })
      .then(fetchData);
  };

  const footerButton3 = [
    {
      text: 'Ok',
      onPress: () => {
        setShowAddAlarmSuccModal(false);
      },
    },
  ];

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
    const time: string = item.time.split(' ')[4].substring(0, 5);
    const notificationIsOn = item.notification_on;
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
            checked={notificationIsOn}
            onChange={() => {
              console.log(item.id);
              !notificationIsOn;
              switchNotifications(item.id, item.notification_on);
            }}
          ></Switch>
        </View>
      </Swipeout>
    );
  };

  const renderMed = (obj: any) => {
    const item: medicineProps = obj.item;
    return (
      <CheckboxItem
        onChange={() => {
          console.warn(item.mid);
        }}
      >
        {item.name}
      </CheckboxItem>
    );
  };

  return (
    <View>
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
      <Modal
        title='Select medicines'
        transparent
        onClose={() => setShowMedCheckBox(false)}
        maskClosable
        visible={showMedCheckBox}
        footer={footerButton3}
      >
        <FlatList
          data={medData}
          renderItem={renderMed}
          keyExtractor={(item: any) => item.key}
        ></FlatList>
      </Modal>
      <Modal
        title='Alarm added'
        transparent
        onClose={() => setShowAddAlarmSuccModal(false)}
        maskClosable
        visible={showAddAlarmSuccModal}
        footer={footerButton3}
      ></Modal>
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

export default connect(
  mapState,
  mapDispatch
)(({ user, showTimePicker, toogleTimePicker }: notificationProps) => (
  <Provider>
    <Notification
      user={user}
      showTimePicker={showTimePicker}
      toogleTimePicker={toogleTimePicker}
    ></Notification>
  </Provider>
));
