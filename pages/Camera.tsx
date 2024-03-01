import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bumper from '../components/Bumper';

async function getMatch() {
    const serverIP = process.env.EXPO_PUBLIC_SERVER_IP;
    console.log(serverIP);
    try {
        const response = await fetch(`${serverIP}/get-match`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.msg === 'SUCCESS') {
            console.log(data);
        }
        return [];
    } catch (error) {
        console.error(error);
        alert('Network error');
        return [];
    }
}

const CameraPage = ({ route, navigation }: {route: any, navigation: any}) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [userID, setUserID] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const cameraRef = useRef<Camera | null>(null);

    const { username } = route.params;

    if (!permission) {
        requestPermission();
    }

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
        getMatch()
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
          const photo = await cameraRef.current!.takePictureAsync({base64: true});
          navigation.navigate('CameraVerification', {pic: photo, username: username})
        }
      };

    return (
        <>
        <View style={styles.bumperContainer}>
            <Bumper location='top' title='Your Fistbump:' subtext='Avery Allen' onPress={() => navigation.navigate("Home", { username: username })} />
        </View>
        <Camera ref={(ref) => { if (ref) { cameraRef.current = ref; } } } style={styles.container} type={CameraType.front}>
            <View style={styles.captureButtonContainer}>
                <TouchableOpacity onPress={takePicture} style={styles.captureButton}>

                </TouchableOpacity>
            </View>
        </Camera></>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3',
        alignItems: 'center'
    },

    titleText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        fontSize: 45,
        textAlign: 'center'
    },

    captureButtonContainer: {
        position: 'absolute',
        height: 250,
        paddingBottom: 100,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
    },

    captureButton: {
        borderRadius: 200,
        height: 90,
        width: 90,
        borderColor: 'white',
        borderWidth: 7,
        opacity: 1
    },

    bumperContainer: {
        zIndex: 2,
        flex: .1
    }

});

export default CameraPage;