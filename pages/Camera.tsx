import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Camera, CameraType } from 'expo-camera';

type BackgroundButtonProps = {
    onPress: () => void;
    title: string;
    buttonStyle: any;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, buttonStyle }) => (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={buttonStyle}>
      <Text style={styles.fistbumpButtonText}>{title}</Text>
    </TouchableOpacity>
);


const CameraPage = ({ navigation }: {navigation: any}) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        requestPermission();
    }

    return (
        <Camera style={styles.container} type={CameraType.front}>
            <View style={styles.fistbumpButton}>
                <BackgroundButton title={"Fistbump"} buttonStyle={styles.fistbumpButton} onPress={() => navigation.navigate('Home')}></BackgroundButton>
            </View>

            <View style={styles.captureButtonContainer}>
                <TouchableOpacity style={styles.captureButton}>

                </TouchableOpacity>
            </View>            
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3'
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
        marginBottom: 0
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

    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    fistbumpButtonText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 35
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
    }
});

export default CameraPage;