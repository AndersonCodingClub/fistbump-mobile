import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useRoute } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


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
    const { pic, username, matchUserRow } = route.params;

    const [userID, setUserID] = useState<string | null>(null);

    AsyncStorage.getItem('userID').then(retrievedUserID => {
        setUserID(retrievedUserID);
    });

    const acceptImage = () => {
        fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/save-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageData: pic.base64,
                userID: userID,
                matchUserID: matchUserRow[0]
            }),
        })
        .then(data => {
            navigation.navigate('Home', { username: username });
        })
        .catch(error => {
            console.error(error);
            alert('Network error');
        });
    };

    return(
        <ImageBackground style={[styles.image, styles.reverse]} source={{uri: `data:image/jpeg;base64,${pic.base64}`}}>
            <View style={styles.fistbumpButton}>
                <BackgroundButton title={"Fistbump"} buttonStyle={[styles.fistbumpButton, styles.reverse]} onPress={() => console.log('button!')}></BackgroundButton>
            </View>

            <View style={styles.acceptButtonContainer}>
                <BackgroundButton title={"👍"} buttonStyle={[styles.acceptButton, styles.reverse]} onPress={acceptImage}/>
                <BackgroundButton title={"🗑️"} buttonStyle={[styles.declineButton, styles.reverse]} onPress={() => navigation.pop()}/>
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

    reverse: {
        transform: [{ scaleX: -1 }]
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
        alignItems: 'center',
    },

    acceptButtonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        height: 150,
        paddingBottom: 100,
        bottom: 0,
        justifyContent: 'center',
        alignContent: 'center',
    },

    acceptButton: {
        borderRadius: 5,
        marginRight: 50,
        height: 80,
        width: 90,
        backgroundColor: '#51c45e',
        justifyContent: 'center'
    },

    declineButton: {
        borderRadius: 5,
        height: 80,
        marginLeft: 50,
        width: 90,
        backgroundColor: '#c45151',
        justifyContent: 'center'
    }
});

export default CameraVerification;