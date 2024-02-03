import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

type BackgroundButtonProps = {
    onPress: () => void;
    title: string;
    subtext: string;
    buttonStyle: any;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, buttonStyle, subtext }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={buttonStyle}>
      <Text style={styles.fistbumpButtonText}>{title}</Text>
      <Text style={styles.fistbumpButtonSubText}>{subtext}</Text>
    </TouchableOpacity>
);

export default function HomePage({ navigation }: {navigation: any}) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        AsyncStorage.getItem('userID').then(retrievedUserID => {
            if (retrievedUserID !== null) {
                setUserID(retrievedUserID);
            } else {
                navigation.navigate('Landing');
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {userID ? `You've been logged in as ${userID}` : "You've been logged In"}
                </Text>
            </View>
            <BackgroundButton title={"Daily Fistbump:"} subtext={"Greg Shatsman"} buttonStyle={styles.fistbumpButton} onPress={() => navigation.navigate('CameraPage', {userID: userID})}></BackgroundButton>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3'
    },

    titleContainer: {
        marginTop: 100
    },

    titleText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        fontSize: 45,
        textAlign: 'center'
    },

    fistbumpButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#BCB4F7',
        width: '100%',
        borderRadius: 25,
        paddingTop: 35,
        paddingBottom: 50,
        justifyContent: 'flex-start'
    },

    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    fistbumpButtonText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 35,
        flex: 1
    },
    fistbumpButtonSubText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        flex: 1
    },

    fistbumpButtonStreakText: {
        flex: 1,
        paddingRight: 20,
        height: 40,
        width: 40,
    }
});