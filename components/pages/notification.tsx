import React, { useState } from 'react';
import Switch from '@ant-design/react-native/lib/switch';
import { View, Text } from 'react-native';

function Notification() {
  const [show, setShow] = useState(true);
  const showSpec = (show: boolean) => {
    if (show) {
      return (
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>
            This function is currently under construction
          </Text>
        </View>
      );
    }
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
          Turn {show ? 'off' : 'on'} notification
        </Text>
        <Switch
          checked={show}
          onChange={() => {
            setShow(!show);
          }}
        ></Switch>
      </View>
      {showSpec(true)}
    </View>
  );
}

export default Notification;
