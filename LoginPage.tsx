import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';
import { useFonts } from 'expo-font';
import React from 'react';

type BackgroundButtonProps = {
    onPress: () => void;
    title: string;
    isEnabled: boolean;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, isEnabled }) => (
    <TouchableOpacity onPress={onPress} disabled={!isEnabled} style={[styles.authButtonBase, { backgroundColor: isEnabled ? '#FFE033' : 'lightgray' }]}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

function LogInScreen() {
    const [fontsLoaded] = useFonts({
        'Roobert': require('./assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('./assets/Roobert-Bold.otf')
    });

    const [username, onInputChangeText] = React.useState('');
    const [password, onPasswordChangeText] = React.useState('');
    const isButtonEnabled = username.length > 0 && password.length > 0;

    const handlePress = () => {
        if (isButtonEnabled) {
            const client = TcpSocket.createConnection({ port: 3000, host: 'localhost' }, () => {
                const payload = JSON.stringify({
                    operation: 'LOGIN',
                    username: username,
                    password: password
                });
        
                client.write(payload);
            });
        
            client.on('data', (data) => {
                try {
                    const response = JSON.parse(data.toString());
                    if (response.msg === 'SUCCESS') {
                        alert('SUCCESS')
                    } else {
                        alert('FAIL')
                    }
                } catch (error) {
                    console.error('Error parsing response:', error);
                }
                client.destroy();
            });
        
            client.on('error', (error) => {
                console.error('TCP Socket Error:', error);
            });
        
            client.on('close', () => {
                console.log('Connection closed');
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.subtextContainer, styles.centerContainer]}>
                <Text style={styles.logoSubText}>Log In</Text>
            </View>
            <View style={{marginTop: 60, marginLeft: 50}}>
                <Text style={styles.inputLabel}>
                    Username or Email
                </Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={username => onInputChangeText(username)}
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
                    onChangeText={password => onPasswordChangeText(password)}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType={'password'}
                />
            </View>
            <View style={[styles.buttonContainer, styles.centerContainer]}>
                <BackgroundButton 
                    onPress={handlePress}
                    title="Log In" 
                    isEnabled={isButtonEnabled}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    subtextContainer: {
        marginTop: 120
    },

    logoContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 85,
        marginBottom: 115
    },
    
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo: {
        width: 100,
        height: 100
    },

    logoSubText: {
        fontFamily: 'Roobert-Bold',
        fontSize: 35,
        color: '#372F35'
    },

    inputContainer: {
        flex: 2,
        width: '100%',
        flexDirection: 'column',
        opacity: 0.
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
        marginTop: 100
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

export default LogInScreen;