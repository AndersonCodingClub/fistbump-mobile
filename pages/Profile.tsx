import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from 'buffer';


async function getImageUrls() {
    const serverIP = process.env.EXPO_PUBLIC_SERVER_IP;
    const baseUrl = `${serverIP}/serve/`;
    try {
        const response = await fetch(`${serverIP}/get-posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.msg === 'SUCCESS' && Array.isArray(data.image_paths)) {
            const imageUrls = data.image_paths.map((path: string) => baseUrl + path);
            console.log('Full Image URLs:', imageUrls);
            return imageUrls;
        }
        return [];
    } catch (error) {
        console.error(error);
        alert('Network error');
        return [];
    }
}

export default function Profile({route, navigation}: {route: any, navigation: any}) {    
    const { userID, viewerUserID } = route.params;
    const viewerId = String(viewerUserID);
    const userId = String(userID);

    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });

    const [name, setName] = useState('Loading...');
    const [username, setUsername] = useState('Loading...');
    const [followerCount, setFollowerCount] = useState('0');
    const [followingCount, setFollowingCount] = useState('0');
    const [postCount, setPostCount] = useState('0');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isFollowing, setIsFollowing] = useState(true);
    const [profilePicture, setProfilePicture] = useState(require('../assets/fistbump_default_pfp.png'));

    useEffect(() => {
        const getUserInfo = async () => {
            const serverIP = process.env.EXPO_PUBLIC_SERVER_IP;
            try {
                const response = await fetch(`${serverIP}/get-user-info/${userID}`);
                const data = await response.json();
                if (data.msg === 'SUCCESS') {
                    setName(data.name);
                    setUsername(data.username);
                    setFollowerCount(data.followerCount);
                    setFollowingCount(data.followingCount);
                    setPostCount(data.postCount);
                    if (data.profilePicture && data.profilePicture.trim() !== '') {
                        setProfilePicture({ uri: `${serverIP}/serve/${data.profilePicture}` });
                    } else {
                        setProfilePicture(require('../assets/fistbump_default_pfp.png'));
                    }
                } else {
                    console.error('Failed to load user info');
                    setName('Error');
                    setUsername('Error');
                }
            } catch (error) {
                console.error('Network error:', error);
                setName('Network Error');
                setUsername('Network Error');
            }
        };

        getUserInfo();
    }, [userID]);

    useEffect(() => {
        const checkFollowingStatus = async () => {
            const serverIP = process.env.EXPO_PUBLIC_SERVER_IP;
            try {
                const response = await fetch(`${serverIP}/check-following-status`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        viewerUserID: viewerUserID,
                        userID: userID
                    }),
                });
                const data = await response.json();
                if (data.msg === 'SUCCESS') {
                    setIsFollowing(data.isFollowing);
                } else {
                    console.error('Failed to check following status');
                }
            } catch (error) {
                console.error('Network error when checking following status:', error);
            }
        };
    
        if (viewerUserID && userID) {
            checkFollowingStatus();
        }
    }, [viewerUserID, userID]);

    const toggleFollow = async () => {
        const serverIP = process.env.EXPO_PUBLIC_SERVER_IP;
        const endpoint = isFollowing ? '/unfollow' : '/follow';
        try {
            const response = await fetch(`${serverIP}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followerID: viewerUserID,
                    followingID: userID
                }),
            });
            const data = await response.json();
            if (data.msg === 'SUCCESS') {
                setIsFollowing(!isFollowing);
                if (isFollowing) {
                    setFollowerCount(prev => (parseInt(prev) - 1).toString());
                } else {
                    setFollowerCount(prev => (parseInt(prev) + 1).toString());
                }
            } else {
                console.error('Failed to toggle follow status');
            }
        } catch (error) {
            console.error('Network error when toggling follow status:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled && result.assets) {
            setProfilePicture({ uri: result.assets[0].uri });
            uploadProfilePicture(result.assets[0].uri);
        }
    };

    const uploadProfilePicture = async (uri: string) => {
        const serverIP = process.env.EXPO_PUBLIC_SERVER_IP;
    
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
    
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64data = reader.result;
                if (base64data) {
                    const base64 = (base64data as string).split(',')[1];
    
                    try {
                        const uploadResponse = await fetch(`${serverIP}/save-profile-picture`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                userID: userID,
                                imageData: base64
                            })
                        });
                        const uploadData = await uploadResponse.json();
                        if (uploadData.msg === 'SUCCESS') {
                            Alert.alert("Success", "Profile picture updated successfully.");
                        } else {
                            console.error('Failed to upload profile picture');
                            Alert.alert("Upload failed", "Failed to upload profile picture.");
                        }
                    } catch (error) {
                        console.error('Network error:', error);
                        Alert.alert("Network error", "Failed to communicate with the server.");
                    }
                } else {
                    console.error("Failed to convert image to base64.");
                    Alert.alert("Conversion Error", "Failed to convert image to base64.");
                }
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error("Error fetching image to upload", error);
            Alert.alert("Upload Error", "Could not load image for upload.");
        }
    };

    useEffect(() => {
        getImageUrls().then(urls => setImageUrls(urls));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            <StatusBar backgroundColor={'#372F35'}/>

            <View style={{ flex: 1, marginLeft: 25, flexDirection: 'row', marginTop: 35 }}>
                <TouchableOpacity onPress={viewerId === userId ? pickImage : undefined} activeOpacity={viewerUserID === userId ? 0.2 : 1}>
                    <Image 
                        source={profilePicture}
                        resizeMode='contain'
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 999,
                            borderWidth: 1,
                            marginTop: 0,
                        }}
                    />
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'column', rowGap: 10, marginLeft: 25, marginTop: 0 }}>
                    <Text style={styles.profileNameText}>{name}</Text>
                    <Text style={styles.profileUsernameText}>{username}</Text>
                    {viewerId !== userId && (
                        <TouchableOpacity style={[styles.followButton, { backgroundColor: isFollowing ? '#d4d4d4' : '#4c68d7' }]} onPress={toggleFollow}>
                        <Text style={{fontFamily: 'Roobert-Bold', fontSize: 15, color: 'white'}}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Text>
                    </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <View style={{ paddingVertical: 8, flexDirection: "row"}}>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 20}}>
                        <Text style={styles.statText}> {followerCount} </Text>
                        <Text> Followers </Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 20}}>
                        <Text style={styles.statText}> {followingCount} </Text>
                        <Text> Following </Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 20}}>
                        <Text style={styles.statText}> {postCount} </Text>
                        <Text> Posts </Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.galleryContainer}>
                {imageUrls.map((url, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate("Post", { url: url, urls: imageUrls, i: index})} style={styles.galleryImageBoundingBox}>
                        <ImageBackground source={{ uri: url }} style={styles.galleryBackgroundImage} />
                    </TouchableOpacity>
                ))}
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    profileNameText: {
        fontFamily: 'Roobert',
        fontSize: 20
    },

    profileUsernameText: {
        fontFamily: 'Roobert',
        fontSize: 16
    },

    followButton: {
        width: 75,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    statText: {
        fontFamily: 'Roobert',
        fontWeight: 'bold'
    },

    galleryContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center',
    },

    galleryImageBoundingBox: {
        width: '95%',
        height: 300,
        backgroundColor: '#372F35',
        borderRadius: 25,
        marginBottom: 10,
        overflow: 'hidden'
    },

    galleryBackgroundImage: {
        width: '100%',
        height: '100%'
    }
});