import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, Image, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import DatePicker, { getFormatedDate} from 'react-native-modern-datepicker';

const Profile = () => {
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
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
                
                <View style={{ flex: 1, paddingVertical: 8, flexDirection: "row"}}>
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
                        

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile