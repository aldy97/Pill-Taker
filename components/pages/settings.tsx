import React from 'react';
import { View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import Provider from '@ant-design/react-native/lib/provider';
import Card from '@ant-design/react-native/lib/card';
import * as Google from 'expo-google-app-auth';

type SettingsProps = {
  user: Google.GoogleUser;
  setUser: any;
};

function Settings({ user, setUser }: SettingsProps) {
  return (
    <View>
      <Card>
        <Card.Header
          extra={user.name}
          thumbStyle={{ width: 30, height: 30 }}
          thumb={user.photoUrl}
        />
      </Card>
      <Button
        style={{ marginTop: 10 }}
        type='warning'
        onPress={() => {
          setUser();
        }}
      >
        Sign out
      </Button>
    </View>
  );
}

export default ({ user, setUser }: SettingsProps) => (
  <Provider>
    <Settings user={user} setUser={setUser} />
  </Provider>
);
