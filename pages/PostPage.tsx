import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useFonts } from 'expo-font';


export default function PostPage({ route, navigation }: {route: any, navigation: any}) {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    const { urls, i, viewerUserID } = route.params;
    const metadataUrl = urls[i] + '/metadata';
    const windowWidth = Dimensions.get('window').width;

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

    const renderItem = ({ item }: { item: string }) => (
        <Image source={{ uri: item }} style={styles.background} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={urls}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                initialScrollIndex={i}
                getItemLayout={(data, index) => ({
                    length: windowWidth, offset: windowWidth * index, index
                })}
                showsHorizontalScrollIndicator={false}
            />

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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkgray'
    },

    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'cover'
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