import React from 'react';
import useProgress from '../../hooks/useProgress';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import Provider from '@ant-design/react-native/lib/provider';
import Card from '@ant-design/react-native/lib/card';
import Progress from '@ant-design/react-native/lib/progress';

type SettingsProps = {
  user: string;
  userName: string;
  userIconUrl: string;
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

function Settings({ user, userName, userIconUrl, setUser }: SettingsProps) {
  const percent = useProgress(user);

  const showAccountInfo = (show: boolean) => {
    if (show) {
      return (
        <Card>
          <Card.Header
            extra={userName}
            thumbStyle={{ width: 30, height: 30 }}
            thumb={userIconUrl}
          />
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Header
            extra='Apple User'
            thumbStyle={{ width: 30, height: 30 }}
            thumb='https://images-na.ssl-images-amazon.com/images/I/51e6kpkyuIL._AC_SX466_.jpg'
          />
        </Card>
      );
    }
  };

  return (
    <View>
      <Text style={{ marginTop: 10, marginLeft: 10 }}>Today's process:</Text>
      <View style={styles.style}>
        <View style={{ marginRight: 10, marginLeft: 10, height: 4, flex: 1 }}>
          <Progress percent={percent} />
        </View>
        <Text style={{ marginRight: 10 }}>{percent}%</Text>
      </View>
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

export default ({ user, userName, userIconUrl, setUser }: SettingsProps) => (
  <Provider>
    <Settings
      user={user}
      userName={userName}
      userIconUrl={userIconUrl}
      setUser={setUser}
    />
  </Provider>
);
