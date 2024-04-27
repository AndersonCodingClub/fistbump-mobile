import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Button, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';


export default function PostPage({ route, navigation }: {route: any, navigation: any}) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    const { url, urls, i, viewerUserID } = route.params;
    const metadataUrl = url + '/metadata';

    const handlePrevious = () => {
        const prevIndex = Math.max(i - 1, 0);
        navigation.navigate('Post', { url: urls[prevIndex], urls: urls, i: prevIndex });
    };

    const handleNext = () => {
        const nextIndex = Math.min(i + 1, urls.length - 1);
        navigation.navigate('Post', { url: urls[nextIndex], urls: urls, i: nextIndex });
    };

    const [user1ID, setUser1ID] = useState();
    const [user2ID, setUser2ID] = useState();
    const [user1Name, setUser1Name] = useState('Loading...');
    const [user2Name, setUser2Name] = useState('Loading...');
    const [datePublished, setDatePublished] = useState('Loading...');

    useEffect(() => {
        fetch(metadataUrl)
            .then(response => response.json())
            .then(data => {
                setUser1ID(data.user1_id);
                setUser2ID(data.user2_id);
                setUser1Name(data.user1_name);
                setUser2Name(data.user2_name);
                setDatePublished(data.date_published);
            })
            .catch(error => {
                console.error('Failed to fetch metadata:', error);
                setUser1Name('Failed to load');
                setUser2Name('Failed to load');
                setDatePublished('Failed to load');
            });
    }, [metadataUrl]);

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
                <View style={{ position: 'absolute', top: 680, left: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile', { userID: user1ID, viewerUserID: viewerUserID })} >
                            <Text style={[styles.infoText, styles.nameText]}>{user1Name}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.infoText]}>{'  &  '}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile', { userID: user2ID, viewerUserID: viewerUserID })} >
                            <Text style={[styles.infoText, styles.nameText]}>{user2Name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ position: 'absolute', top: 720, left: 50 }}>
                    <Text style={styles.infoText}>{datePublished}</Text>
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
    },

    infoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    nameText: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        textShadowColor: 'yellow',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10
    }
});