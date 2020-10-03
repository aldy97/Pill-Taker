import React, { useState } from 'react';
import Switch from '@ant-design/react-native/lib/switch';
import { View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function Notification() {
  const [show, setShow] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
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
          All Notifications: {show ? 'On' : 'Off'}
        </Text>
        <Switch
          checked={show}
          onChange={() => {
            setShow(!show);
          }}
        ></Switch>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='time'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default Notification;
