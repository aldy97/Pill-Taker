import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@ant-design/react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

export default function Signin() {
    const signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                _syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    const onPress = () => {
        signInAsync()
    }

    return (
        <View>
            <Button type="primary">Sign in with Google</Button>
        </View>
    )
}