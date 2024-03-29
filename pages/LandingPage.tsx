import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import BackgroundButton from '../components/BackgroundButton';

const LandingPage = ({navigation}: {navigation: any}) => {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
      });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Fistbump</Text>
            </View>
            <View style={styles.sloganContainer}>
                <Text style={styles.sloganText}>Connect in the real world.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <BackgroundButton onPress={() => navigation.navigate('Log In')} title="Log In" style={[styles.authButtonBase, {backgroundColor: '#FFE450'}]}></BackgroundButton>
                <BackgroundButton onPress={() => navigation.navigate('Sign Up')} title="Sign Up" style={[styles.authButtonBase, {backgroundColor: '#F9724D'}]}></BackgroundButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6FB4EB',
        alignItems: 'center',
    },

    titleContainer: {
        marginTop: '30%'
    },

    titleText: {
        fontSize: 75,
        color: '#372F35',
        fontFamily: 'Roobert-Bold',
    },

    sloganContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
     },

    sloganText: {
        fontSize: 25,
        textAlign: 'center',
        color: '#372F35',
        fontFamily: 'Roobert-Bold',
    },

    buttonContainer: {
        flex: 2,
        flexDirection: 'column',
        rowGap: 25,
        marginTop: 150,
    },

    authButtonBase: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 110,
        paddingRight: 110,
        borderRadius: 5
    },
});

export default LandingPage;