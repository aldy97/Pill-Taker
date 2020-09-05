import React, { useState } from 'react';
import Switch from '@ant-design/react-native/lib/switch';
import { View, Text } from 'react-native';

function Notification() {
  const [show, setShow] = useState(true);
  const showSpec = (show: boolean) => {
    if (show) {
      return <View></View>;
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
        }}
      >
        <Text style={{ fontSize: 20 }}>Turn on/off notification</Text>
        <Switch
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
