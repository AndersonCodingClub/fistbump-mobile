import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';


function SignUpScreen() {
    const [fontsLoaded] = useFonts({
        'Roobert': require('./assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('./assets/Roobert-Bold.otf')
    });

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Sign Up</Text>
        </View>
    );
}

export default SignUpScreen;