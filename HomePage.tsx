import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function HomePage({navigation}: {navigation: any}) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('./assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('./assets/Roobert-Bold.otf')
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const [userID, setUserID] = React.useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const initialButtonHeight = 115;
    const [currentButtonHeight, setCurrentButtonHeight] = useState(initialButtonHeight);
    const buttonHeight = useRef(new Animated.Value(initialButtonHeight)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        AsyncStorage.getItem('userID').then(retrievedUserID => {
            if (retrievedUserID !== null) {
                setUserID(retrievedUserID);
            } else {
                navigation.navigate('Landing');
            }
        });
    }, []);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                const newHeight = currentButtonHeight - gestureState.dy;
                if (newHeight > initialButtonHeight && newHeight <= screenHeight) {
                    buttonHeight.setValue(newHeight);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                const finalHeight = currentButtonHeight - gestureState.dy;
                const thresholdHeight = screenHeight * 0.1;
                const toValue = finalHeight >= thresholdHeight ? screenHeight : initialButtonHeight;

                Animated.timing(buttonHeight, {
                    toValue,
                    duration: 500,
                    useNativeDriver: false,
                }).start(() => {
                    setCurrentButtonHeight(toValue);
                    setIsExpanded(finalHeight >= thresholdHeight);
                });
            },
        })
    ).current;

    const animateButton = () => {
        const finalHeight = isExpanded ? initialButtonHeight : screenHeight;
        const textTranslateY = isExpanded ? 0 : 100;

        Animated.parallel([
            Animated.timing(buttonHeight, {
                toValue: finalHeight,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(translateY, {
                toValue: textTranslateY,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start(() => {
            setIsExpanded(!isExpanded);
            setCurrentButtonHeight(finalHeight);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                    {userID ? `You've been logged in as ${userID}` : "You've been logged In"}
                </Text>
            </View>
            <Animated.View style={[styles.fistbumpButton, { height: buttonHeight }]} {...panResponder.panHandlers}>
                <TouchableOpacity style={styles.buttonContent} onPress={animateButton}>
                    <Animated.Text style={[styles.fistbumpButtonText, { transform: [{ translateY }] }]}>
                        Fistbump
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3'
    },

    titleContainer: {
        marginTop: 100
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
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#BCB4F7',
        width: '100%',
        borderRadius: 25,
        paddingTop: 25,
        paddingBottom: 50,
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
    }
});