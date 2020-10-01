import React from 'react';
import useProgress from '../../hooks/useProgress';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import Provider from '@ant-design/react-native/lib/provider';
import Card from '@ant-design/react-native/lib/card';
import Progress from '@ant-design/react-native/lib/progress';
import * as Google from 'expo-google-app-auth';

type SettingsProps = {
  user: Google.GoogleUser;
  setUser: any;
};

const styles = StyleSheet.create({
  style: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Settings({ user, setUser }: SettingsProps) {
  const percent = useProgress(user);
  return (
    <View>
      <Card>
        <Card.Header
          extra={user.name}
          thumbStyle={{ width: 30, height: 30 }}
          thumb={user.photoUrl}
        />
      </Card>
      <Text style={{ marginTop: 10 }}>Today's process:</Text>
      <View style={styles.style}>
        <View style={{ marginRight: 10, height: 4, flex: 1 }}>
          <Progress percent={percent} />
        </View>
        <Text>{percent}%</Text>
      </View>
      <Button
        style={{ marginTop: 10 }}
        type='warning'
        onPress={() => {
          setUser();
        }}
      >
        Sign out!
      </Button>
    </View>
  );
}

export default ({ user, setUser }: SettingsProps) => (
  <Provider>
    <Settings user={user} setUser={setUser} />
  </Provider>
);
