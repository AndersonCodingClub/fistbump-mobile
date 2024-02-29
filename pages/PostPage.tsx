import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useFonts } from 'expo-font';


export default function PostPage({ route, navigation }: {route: any, navigation: any}) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    const { url } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <Image source={{uri: url}} style={styles.background}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    backgroundContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84
    },

    background: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
    }
});