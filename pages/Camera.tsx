import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Camera, CameraType } from 'expo-camera';

type BackgroundButtonProps = {
    onPress: () => void;
    title: string;
    subtext: string;
    buttonStyle: any;
    streak: number;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, subtext, buttonStyle, streak}) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={buttonStyle}>
      <View style={styles.fistbumpButtonTextContainer}>
        <Text style={styles.fistbumpButtonText}>{title}</Text>
        <Text style={styles.fistbumpButtonSubText}>{subtext}</Text>
      </View>
      <View style={styles.fistbumpButtonTextContainer}>
        <Image style={styles.fistbumpButtonStreakIcon} source={require('../assets/fire.png')} />
        <Text style={styles.fistbumpButtonStreakNumber}>{streak}</Text>
      </View>

    </TouchableOpacity>
);


const CameraPage = ({ route, navigation }: {route: any, navigation: any}) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef<Camera | null>(null);
    const {userID} = route.params;

    if (!permission) {
        requestPermission();
    }

    const takePicture = async () => {
        if (cameraRef) {
          const photo = await cameraRef.current!.takePictureAsync({base64: true});
          navigation.navigate('CameraVerification', {pic: photo, userID: userID})
        }
      };

    return (
        <Camera ref={(ref) => {if (ref) {cameraRef.current = ref;}}} style={styles.container} type={CameraType.front}>
            <View style={styles.fistbumpButton}>
                <BackgroundButton title={"Daily Fistbump:"} subtext={"Greg Shatsman"} streak={0} buttonStyle={styles.fistbumpButton} onPress={() => navigation.navigate('Home')}></BackgroundButton>
            </View>
            <View style={styles.captureButtonContainer}>
                <TouchableOpacity onPress={takePicture} style={styles.captureButton}>

                </TouchableOpacity>
            </View>            
        </Camera>
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

    fistbumpButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0,
    },

    fistbumpButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#BCB4F7',
        width: '100%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingTop: 50,
        paddingBottom: 35,
        justifyContent: 'flex-start'
    },

    fistbumpButtonText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 35,
        flex: 3
    },

    fistbumpButtonSubText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        flex: 3,
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

    fistbumpButtonStreakIcon: {
        flex: 1,
        paddingLeft: 20,
        height: 20,
        width: 20,
        
    },
    fistbumpButtonStreakNumber: {
        flex: 1,
        paddingLeft: 20,
    
    },

    fistbumpButtonTextContainer: {
        flexDirection: 'column'
    }

});

export default CameraPage;