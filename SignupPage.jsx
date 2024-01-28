import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';


function SignUpScreen() {
    const [fontsLoaded] = useFonts({
        'Roobert': require('./assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('./assets/Roobert-Bold.otf')
    });

    const [username, onChangeText] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                placeholder='Username'
                style={styles.input}
                value={username}
                onChangeText={username => onChangeText(username)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6FB4EB',
        alignItems: 'center',
    },

    title: {
        marginTop: '30%',
        fontSize: 50,
        fontFamily: 'Roobert-Bold'
    },

    input: {
        fontFamily: 'Roobert',
        marginTop: 100,
        width: 295,
        paddingHorizontal: 15,
        height: 80,
        fontSize: 40,
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: '#FFFFFF'
    }
});

export default SignUpScreen;