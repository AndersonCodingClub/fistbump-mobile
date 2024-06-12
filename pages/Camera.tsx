import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Bumper from '../components/Bumper';


export default function CameraPage({ route, navigation }: {route: any, navigation: any}) {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    const { username, matchUserRow } = route.params;

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current !== null) {
            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            navigation.navigate('CameraVerification', { pic: photo, username: username, matchUserRow: matchUserRow });
        }
    };

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="front">
                <Bumper
                    title={"Daily Fistbump:"}
                    subtext={"placeholder"}
                    location={'top'}
                    onPress={() => navigation.navigate('Home', { username: username })}
                />
                <View style={styles.captureButtonContainer}>
                    <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
    },

    camera: {
        flex: 1,
        width: '100%',
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
        justifyContent: 'flex-start',
    },

    fistbumpButtonTextContainer: {
        flexDirection: 'column',
    },

    fistbumpButtonText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 35,
        flex: 3,
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
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    
    captureButton: {
        borderRadius: 45,
        height: 90,
        width: 90,
        borderColor: 'white',
        borderWidth: 7,
        backgroundColor: 'transparent',
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

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },

    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    }
});