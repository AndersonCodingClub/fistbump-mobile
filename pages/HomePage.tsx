import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useIsFocused } from '@react-navigation/native';

import Bumper from '../components/Bumper';

type BackgroundButtonProps = {
    onPress: () => void;
    title: string;
    subtext: string; 
    buttonStyle: any;
};

async function getImageUrls() {
    const baseUrl = 'http://10.9.148.13:3000/serve/';
    try {
        const response = await fetch('http://10.9.148.13:3000/get-images', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.msg === 'SUCCESS' && Array.isArray(data.image_paths)) {
            const imageUrls = data.image_paths.map((path: string) => baseUrl + path);
            console.log('Full Image URLs:', imageUrls);
            return imageUrls;
        }
        return [];
    } catch (error) {
        console.error(error);
        alert('Network error');
        return [];
    }
}

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, buttonStyle, subtext}) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={buttonStyle}>
      <Text style={styles.fistbumpButtonText}>{title}</Text>
      <Text style={styles.fistbumpButtonSubText}>{subtext}</Text>
    </TouchableOpacity>
);

export default function HomePage({route, navigation}: {route: any, navigation: any}) {
    const isFocused = useIsFocused();

    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const [userID, setUserID] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        AsyncStorage.getItem('userID').then(retrievedUserID => {
            if (retrievedUserID !== null) {
                setUserID(retrievedUserID);
            } else {
                navigation.navigate('Landing');
            }
        });
    }, []);

    useEffect(() => {
        if (isFocused) {
            getImageUrls().then(urls => setImageUrls(urls));
        }
    }, [isFocused]);

    const { username } = route.params;

    const openImage = (url: string) => {
        console.log("Clicked image URL:", url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {`Welcome Back ${username}!`}
                </Text>
            </View>
            <ScrollView style={styles.galleryContainer} contentContainerStyle={styles.galleryContentContainer}>
                {imageUrls.map((url, index) => (
                    <TouchableOpacity key={index} onPress={() => openImage(url)} style={styles.galleryImageBoundingBox}>
                        <ImageBackground source={{ uri: url }} style={styles.galleryBackgroundImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Bumper location={'bottom'} title={''} onPress={() => navigation.navigate("CameraPage", { username: username})}/>
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
    },

    buttonContainer: {
        flex: 2,
        flexDirection: 'column',
        rowGap: 25,
        marginTop: 20,
    },

    authButtonBase: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5
    },

    galleryContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        overflow: 'scroll'
    },

    galleryContentContainer: {
        alignItems: 'center',
        paddingBottom: 150
    },

    galleryImageBoundingBox: {
        width: '95%',
        height: 300,
        backgroundColor: '#372F35',
        borderRadius: 25,
        marginBottom: 10,
        overflow: 'hidden'
    },

    galleryBackgroundImage: {
        width: '100%',
        height: '100%'
    }
});