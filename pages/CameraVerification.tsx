import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useRoute } from "@react-navigation/native"


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

const CameraVerification = ({ route, navigation }: {navigation: any, route: any}) => {
    const {pic, userID} = route.params;

    const acceptImage = () => {
        fetch('http://10.9.150.219:3000/save-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageData: pic.base64,
                userID: userID
            }),
        })
        .then(data => {
            navigation.navigate('Home');
        })
        .catch(error => {
            console.error(error);
            alert('Network error');
        });
    };

    return(
        <ImageBackground style={styles.image} source={{uri: `data:image/jpeg;base64,${pic.base64}`}}>
            <View style={styles.fistbumpButton}>
                <BackgroundButton title={"Fistbump"} buttonStyle={styles.fistbumpButton} onPress={() => navigation.navigate('Home')}></BackgroundButton>
            </View>

            <View style={styles.acceptButtonContainer}>
                <BackgroundButton title={"👍"} buttonStyle={styles.acceptButton} onPress={acceptImage}/>
            </View>    
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 35
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

    fistbumpButtonText: {
        fontFamily: 'Roobert-Bold',
        color: '#372F35',
        textAlign: 'center',
        fontSize: 35
    },

    image: {
        flex: 1,
        alignItems: 'center'
    },

    acceptButtonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        height: 250,
        paddingBottom: 100,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
    },

    acceptButton: {
        borderRadius: 200,
        height: 90,
        width: 90,
        backgroundColor: '#69e041',
        justifyContent: 'center'
    }
});

export default CameraVerification;