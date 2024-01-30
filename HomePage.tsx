import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as React from 'react';

export default function HomePage() {
    const [fontsLoaded] = useFonts({
        'Roobert': require('./assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('./assets/Roobert-Bold.otf')
    });

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                You've been logged In
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3E3E3'
    },

    titleText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        fontSize: 45,
        textAlign: 'center'
    }
});