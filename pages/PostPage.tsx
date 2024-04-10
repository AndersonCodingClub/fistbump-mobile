import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { useFonts } from 'expo-font';


export default function PostPage({ route, navigation }: {route: any, navigation: any}) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    const { url, urls, i } = route.params;

    const handlePrevious = () => {
        const prevIndex = Math.max(i - 1, 0);
        navigation.navigate('Post', { url: urls[prevIndex], urls: urls, i: prevIndex });
    };

    const handleNext = () => {
        const nextIndex = Math.min(i + 1, urls.length - 1);
        navigation.navigate('Post', { url: urls[nextIndex], urls: urls, i: nextIndex });
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <Image source={{uri: url}} style={styles.background}/>
                <View style={{ position: 'absolute', top: 300, left: 75 }}>
                    <Button title="Previous" onPress={handlePrevious}></Button>
                </View>
                <View style={{ position: 'absolute', top: 300, left: 255 }}>
                    <Button title="Next" onPress={handleNext}></Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    backgroundContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84
    },

    background: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
    }
});