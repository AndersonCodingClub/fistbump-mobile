import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';
import BackgroundButton from '../components/BackgroundButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


function SignUpScreen({navigation}: {navigation: any} ) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    const [name, onNameInputChangeText] = React.useState('');
    const [username, onUserNameInputChangeText] = React.useState('');
    const [password, onPasswordInputChangeText] = React.useState('');
    const isButtonEnabled = username.length > 0 && password.length > 0 && name.length > 0;

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handlePress = () => {
        if (username.length < 4) {
            alert('Username has to be at least 4 characters long')
        } else if (username.length > 15) {
            alert("Username can't be more than 15 characters long")
        } else if (name.length > 30) {
            alert("Names can't be longer than 30 characters")
        }

        else if (isButtonEnabled) {
            fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/validate-signup-credentials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.msg === 'SUCCESS') {
                    navigation.navigate('Next Sign Up', {name: name, username: username, password: password});
                } else {
                    alert('Username already taken');
                }
            })
            .catch(error => {
                console.error(error);
                alert('Network error');
            });
        }
    };

    return (
        <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
        style={{flex:1}}
        showsVerticalScrollIndicator={false}>
        {

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View>
                <View style={[styles.subtextContainer, styles.centerContainer]}>
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
                    <BackgroundButton onPress={handlePress} title="Next" isEnabled={isButtonEnabled} style={[styles.authButtonBase, { backgroundColor: isButtonEnabled ? '#F9724D' : 'lightgray' }]}></BackgroundButton>
                </View>
            </View>
        </TouchableWithoutFeedback>
    }
    </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6FB4EB',
        alignItems: 'center',

    },

    title: {
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
    },

    subtextContainer: {
        marginTop: 120
    },
});

export default SignUpScreen;