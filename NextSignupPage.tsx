import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';

type BackgroundButtonProps = {
    onPress: () => void;
    title: string;
    isEnabled: boolean;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, isEnabled }) => (
    <TouchableOpacity onPress={onPress} disabled={!isEnabled} style={[styles.authButtonBase, { backgroundColor: isEnabled ? '#F9724D' : 'lightgray' }]}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

function NextSignupScreen() {
    return (
        <Text style= {{marginLeft: 50, marginTop: 100}}>Hi besty!</Text>
    );
}

const styles = StyleSheet.create({
    authButtonBase: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 210,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 60,
        paddingRight: 60,
        borderRadius: 5
    },

    buttonText: {
        fontSize: 25,
        fontFamily: 'Roobert-Bold',
        textAlign: 'center',
        color: '#372F35'
    }
});

export default NextSignupScreen;