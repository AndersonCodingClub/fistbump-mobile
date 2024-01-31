import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';

type BackgroundButtonProps = {
    onPress: () => void;
    title: string;
    isEnabled: boolean;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, isEnabled }) => (
    <TouchableOpacity onPress={onPress} disabled={!isEnabled} style={[styles.authButtonBase, { backgroundColor: isEnabled ? '#F9724D' : 'lightgray' }]}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

function SignUpScreen({navigation}: {navigation: any} ) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    const [name, onNameInputChangeText] = React.useState('');
    const [username, onUserNameInputChangeText] = React.useState('');
    const [password, onPasswordInputChangeText] = React.useState('');
    const isButtonEnabled = username.length > 0 && password.length > 0 && name.length > 0;

    return (
        <View>
            <View style={{marginTop: 30, marginLeft: 135}}>
                <Text style={styles.title}>Sign Up</Text>            
            </View>
            <View style={{marginTop: 30, marginLeft: 50}}>
                <Text style={styles.inputLabel}>
                    Name
                </Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={name => onNameInputChangeText(name)}
                    autoCapitalize={'none'}
                    autoCorrect={false}
    
                />
            </View>
            <View style={{marginLeft: 50}}>
                <Text style={styles.inputLabel}>
                    Username
                </Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={username => onUserNameInputChangeText(username)}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
            </View>
            <View style={{marginLeft: 50}}>
                <Text style={styles.inputLabel}>
                    Password
                </Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={password => onPasswordInputChangeText(password)}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType={'password'}
                />
            </View>
            <View style={[styles.buttonContainer, styles.centerContainer]}>
                <BackgroundButton onPress={() => navigation.navigate('Next Sign Up')} title="Next" isEnabled={isButtonEnabled}></BackgroundButton>
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

    title: {
        marginTop: '30%',
        fontSize: 35,
        fontFamily: 'Roobert-Bold',
        color: '#372F35'
    },

    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputContainer: {
        flex: 2,
        width: '100%',
        flexDirection: 'column'
    },

    inputLabel: {
        fontSize: 22.5,
        color: '#372F35',
        marginBottom: 5,
        fontFamily: 'Roobert-Bold',
    },

    input: {
        width: 300,
        height: 60,
        backgroundColor: '#E6E6E6',
        paddingLeft: 20,
        paddingRight: 20,
        color: '#372F35',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 55
    },

    buttonContainer: {
        marginTop: 45,
    },

    authButtonBase: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 210,
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 60,
        paddingRight: 60,
        borderRadius: 5
    },

    buttonText: {
        fontSize: 25,
        fontFamily: 'Roobert-Bold',
        textAlign: 'center',
        color: '#372F35'
    }
});

export default SignUpScreen;