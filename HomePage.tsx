import * as React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage({navigation}: {navigation: any}) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('./assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('./assets/Roobert-Bold.otf')
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }

    const [userID, setUserID] = React.useState<string | null>(null);

    React.useEffect(() => {
        AsyncStorage.getItem('userID').then(retrievedUserID => {
            if (retrievedUserID !== null) {
                setUserID(retrievedUserID);
            } else {
                navigation.navigate('Landing')
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                {userID ? `You've been logged in as ${userID}` : "You've been logged In"}
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