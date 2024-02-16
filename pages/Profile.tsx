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
const isFocused = useIsFocused();
const [imageUrls, setImageUrls] = useState<string[]>([]);

useEffect(() => {
    if (isFocused) {
        getImageUrls().then(urls => setImageUrls(urls));
    }
}, [isFocused]);
const photosRoutes = ()=>(
    <View style={{flex: 1}}>
        <FlatList
            data={imageUrls}
            numColumns={3}
            renderItem={({item,index}) =>(
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
)

const LikesRoutes = ()=>(
    <View
        style={{
            flex: 1,
            backgroundColor: "blue"
        }}
    />
)

const renderScene = SceneMap({
    first: photosRoutes,
    second: LikesRoutes
});


const Profile = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

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

                <Text style={{marginVertical: 8}}>
                    Avery Allen
                </Text>
                <Text>
                    GigaChad
                </Text>
                
                <View style={{ paddingVertical: 8, flexDirection: "row"}}>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 10}}>
                        <Text> 222 </Text>
                        <Text> Followers </Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 10}}>
                        <Text> 67 </Text>
                        <Text> Following </Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center", marginHorizontal: 10}}>
                        <Text> 999k </Text>
                        <Text> Likes </Text>
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
            <View style={{flex: 1, marginHorizontal: 22, marginTop: 20}}>
                <TabView 
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{width: layout.width}}
                    renderTabBar={renderTabBar}
                    />
            </View>
        </SafeAreaView>
    )
}

export default Profile