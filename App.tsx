import React, { useState } from 'react';
import store from './store/index.js';
import { Provider } from 'react-redux';
import { AppRegistry, View } from 'react-native';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import Button from '@ant-design/react-native/lib/button';
import Routes from './Routes';
import Footer from './components/common/footer';
import getEnvVars from './config';

function App() {
  const [user, setUser] = useState<any>(null);
  const signInAsync = async () => {
    const result = await Google.logInAsync({
      iosClientId:
        '925656945499-1tn3go9b8995su8t3kalk7lbb1kh27qj.apps.googleusercontent.com',
      androidClientId:
        '925656945499-k93quothhqfmogq7tnglhatn4m9unhul.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      // Then you can use the Google REST API
      setUser(result.user);
    }
  };

  const onPress = () => {
    signInAsync();
  };

  if (user) {
    return (
      <View style={{ flex: 1 }}>
        <Routes user={user} />
        <View style={{ height: 70 }}>
          <Footer />
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Button type='primary' onPress={onPress}>
          Sign in with Google
        </Button>
      </View>
    );
  }
}

const env = getEnvVars();

const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_FIREBASE_DATABASE_URL,
  projectId: env?.firebase_project_id,
  storageBucket: process.env.EXPO_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_FIREBASE_MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default App;
AppRegistry.registerComponent('reactTutorialApp', () => App);
