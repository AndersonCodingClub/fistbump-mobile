import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

type BackgroundButtonProps = {
  onPress: () => void;
  title: string;
  additionalBackground: string;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, additionalBackground }) => (
  <TouchableOpacity onPress={onPress} style={[styles.authButtonBase, { backgroundColor: additionalBackground }]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default function App() {
    const [fontsLoaded] = useFonts({
        'Interstate': require('./assets/interstate-bold-cond.otf'),
      });

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Fistbump</Text>
            </View>
            <View style={styles.sloganContainer}>
                <Text style={styles.sloganText}>Connect in the Real World</Text>
            </View>
            <View style={styles.buttonContainer}>
                <BackgroundButton onPress={() => alert("Log In")} title="Log In" additionalBackground='#FAD161'></BackgroundButton>
                <BackgroundButton onPress={() => alert("Sign Up")} title="Sign Up" additionalBackground='#F9724D'></BackgroundButton>
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
        marginTop: 135
    },

    titleText: {
        fontSize: 75,
        color: '#372F35',
        fontFamily: 'Interstate',
    },

    sloganContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 125,
     },

    sloganText: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#372F35',
        //fontFamily: 'Roobert',
    },

    buttonContainer: {
        flex: 2,
        flexDirection: 'column',
        rowGap: 25,
        marginTop: 40
    },

    authButtonBase: {
        justifyContent: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 100,
        paddingRight: 100,
        borderRadius: 10
    },

    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#372F35'
    }
});