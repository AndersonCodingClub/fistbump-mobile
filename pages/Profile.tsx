import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, PanResponder, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Bumper from '../components/Bumper';
import { MaterialIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { takePhoto } from './Camera'


export default function Profile ({route, navigation}: {route: any, navigation: any})  {
    const [selectedImage, setSelectedImage] = useState('')
    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1
        });
        console.log(result);

        if(!result.canceled){
            setSelectedImage(null)
        }
    }

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 22}}>
            <View style={{marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                    style={{position: 'absolute', left: 0}}
                >
                <MaterialIcons
                        name='keyboard-arrow-left'
                        size={24}
                    />
                </TouchableOpacity>
                <Text> Edit Profile </Text>
            </View>
            <ScrollView>
                <View style={{alignItems: 'center', marginVertical: 22}}>
                </View>
                    <TouchableOpacity onPress={handleImageSelection}>  
                        <Image 
                            source={{uri: selectedImage}}
                            style={styles.imageContainer}
                        />
                    </TouchableOpacity>
                    <View style={styles.profileImageIcon}>
                        <MaterialIcons name='photo-camera' size={32}/>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imageContainer:{
        height: 170,
        width: 170,
        borderRadius: 85,
        borderWidth: 2
    },

    profileImageIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        zIndex: 9999
    },
});