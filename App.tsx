import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import store from './store/index.js';
import { Provider } from 'react-redux';
import { AppRegistry, View } from 'react-native';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import Button from '@ant-design/react-native/lib/button';
import Routes from './Routes';
import Footer from './components/common/footer';
import getEnvVars from './config';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

function App() {
  const [user, setUser] = useState<string>();

  const [isReady, setIsReady] = useState<boolean>(false);

  //font loading
  async function prep() {
    await Font.loadAsync(
      'antoutline',
      require('@ant-design/icons-react-native/fonts/antoutline.ttf')
    );
    await Font.loadAsync(
      'antfill',
      require('@ant-design/icons-react-native/fonts/antfill.ttf')
    );
    setIsReady(true);
  }

  useEffect(() => {
    prep();
  }, []);

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
      setUser(result.user.id);
    }
  };

  const onPress = () => {
    signInAsync();
  };

  const onSignInWithAppleBtnPress = async () => {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    console.log(credential.user);
    setUser(credential.user ? credential.user : '');
  };

  if (user) {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Routes user={user} setUser={setUser} />
          <View style={{ height: 70 }}>
            <Footer />
          </View>
        </View>
      </Provider>
    );
  } else {
    return isReady ? (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: '#0e9dec',
            marginBottom: 10,
          }}
        >
          Pills Taker
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            color: '#0e9dec',
            marginBottom: 10,
          }}
        >
          Keep track of your daily pill-taking plan
        </Text>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: '100%', height: 44, marginBottom: 10 }}
          onPress={onSignInWithAppleBtnPress}
        />
        <Button type='primary' onPress={onPress}>
          Sign in With Google
        </Button>
      </View>
    ) : (
      <AppLoading></AppLoading>
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
