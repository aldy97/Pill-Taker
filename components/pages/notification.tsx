import React, { useState, useEffect } from 'react';
import Switch from '@ant-design/react-native/lib/switch';
import { View, Text, FlatList } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { handleShowTimePickerBtnPress } from '../store/ActionsCreator.js';
import * as Google from 'expo-google-app-auth';
import * as firebase from 'firebase';

type alarmProps = {
  time: string;
  desc: string;
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
  const [showAddNotesModal, setShowAddNotesModal] = useState<boolean>(false);

  const COLLECTION = user.name ? user.name + ' Alarms' : 'error';
  const db = firebase.firestore();

  const getAlarms = async () => {
    const alarms = db.collection(COLLECTION).get();
    return alarms;
  };

  const fetchData = async () => {
    getAlarms().then((snapshot) => {
      let array: any = [];
      (snapshot as any).forEach((doc: any) => {
        array.push(doc.data());
      });
      setData(array);
    });
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    toogleTimePicker(false);
  };

  const renderItem = (obj: any) => {
    const item: alarmProps = obj.item;
    return <View></View>;
  };

  return (
    <View>
      <View
        style={{
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
          All Notifications: {showNotification ? 'On' : 'Off'}
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
