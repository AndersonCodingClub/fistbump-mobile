import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, Image, Modal, Keyboard, TouchableWithoutFeedback, useWindowDimensions, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker, { getFormatedDate} from 'react-native-modern-datepicker';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useIsFocused } from '@react-navigation/native';


async function getImageUrls() {
    const serverIP = process.env.EXPO_PUBLIC_SERVER_IP;
    const baseUrl = `${serverIP}/serve/`;
    try {
        const response = await fetch(`${serverIP}/get-images`, {
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

/*const photosRoutes = ()=>(
   <View style={{flex: 1}}>
        <FlatList
        data={photos}
        numColumns={3}
        renderItem={({item, index})=> (
            <View style={{
                flex: 1,
                aspectRatio: 1,
                margin: 3
            }}> 
            <Image
                key={index}
                source={item}
                style={{width: "100%", height: "100%", borderRadius: 12}}
            />
            </View>

        )} 
    />

   </View>
)*/

const LikesRoutes = ()=>(
    <View
        style={{
            flex: 1,
            backgroundColor: "blue"
        }}
    />
)

/*const renderScene = SceneMap({
    first: photosRoutes,
    second: LikesRoutes
});*/


export default function Profile({route, navigation}: {route: any, navigation: any}) {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    
    const { userID } = route.params;

    const [name, setName] = useState('Loading...');
    const [username, setUsername] = useState('Loading...');
    const [followerCount, setFollowerCount] = useState('0');
    const [followingCount, setFollowingCount] = useState('0');
    const [postCount, setPostCount] = useState('0');

    console.log(postCount);

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

    const [routes] = useState([
        {key: "first", title: "Photos"},
        {key: "second", title: "Likes"}
    ])

    const renderTabBar = (props: any)=>(
        <TabBar
        {...props}
        indicatorStyle={{ BackgroundColor: '#F9724D'}}
        style={{height: 44}}
        renderLabel={({focused, route})=>(
            <Text>
                {route.title}
            </Text>
        )} 
        />
    )
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor={'#372F35'}/>
            <View style={{width: "100%"}}>
            <Image
                source={require('../assets/adaptive-icon.png')}
                resizeMode='cover'
                style={{ height: 228, width: "100%"}}/>
            </View>

            <View style={{flex: 1, alignItems: "center"}}>
                <Image 
                    source = {require('../assets/adaptive-icon.png')}
                    resizeMode='contain'
                    style={{
                        height: 155,
                        width: 155,
                        borderRadius: 999,
                        borderWidth: 2,
                        marginTop: -90,
                    }}
                />

                <Text style={{marginVertical: 8}}>{name}</Text>
                <Text>{username}</Text>
                
                <View style={{ paddingVertical: 8, flexDirection: "row"}}>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 10}}>
                        <Text> {followerCount} </Text>
                        <Text> Followers </Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 10}}>
                        <Text> {followingCount} </Text>
                        <Text> Following </Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 10}}>
                        <Text> {postCount} </Text>
                        <Text> Posts </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                    style={{ width: 124, height: 36, alignItems: 'center', borderRadius: 10,
                    marginHorizontal: 10}}>
                        <Text> Edit Profile </Text>

                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <TouchableOpacity
                    style={{ width: 124, height: 36, alignItems: 'center', borderRadius: 10,
                    marginHorizontal: 10}}>
                        <Text> Edit Profile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{ width: 124, height: 36, alignItems: 'center', borderRadius: 10,
                    marginHorizontal: 10}}>
                        <Text> Add Friend </Text>
                    </TouchableOpacity>
                </View>
            </View>

         
            
        </SafeAreaView>
    )
}
/*<View style={{flex: 1, marginHorizontal: 22, marginTop: 20}}>
                <TabView 
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{width: layout.width}}
                    renderTabBar={renderTabBar}
                    />
            </View> */