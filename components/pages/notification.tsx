import React, { useState } from 'react';
import Switch from '@ant-design/react-native/lib/switch';
import { View, Text } from 'react-native';

function Notification() {
  const [show, setShow] = useState(true);
  const showSpec = (show: boolean) => {
    if (show) {
      return (
        <View>
          <Text>test</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}
      >
        <Text style={{ fontSize: 24, marginLeft: 10 }}>
          Turn {show ? 'off' : 'on'} notification
        </Text>
        <Switch
          style={{ marginBottom: 20 }}
          checked={show}
          onChange={() => {
            setShow(!show);
          }}
        ></Switch>
      </View>
      {showSpec(show)}
    </View>
  );
}

export default Notification;
