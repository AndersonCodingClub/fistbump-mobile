import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Bumper from '../components/Bumper';
import { MaterialIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import DatePicker, { getFormatedDate} from 'react-native-modern-datepicker';

export default function Profile ({route, navigation}: {route: any, navigation: any})  {
    const [selectedImage, setSelectedImage] = useState('')
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(new Date(today.setDate(today.getDate() + 1)), "YYYY/MM/DD");
    
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("");

    const handleChangeStartDate = (propDate: string) => {
        setStartedDate(propDate);
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker)
    }

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1
        });
        console.log(result);

        if(!result.canceled){
            setSelectedImage("")
        }
    };

    function renderDatePicker(){
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={openStartDatePicker}
            >
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",

                }}>
                    <View style={{margin: 20, alignItems: "center", justifyContent: "center", borderRadius: 20, padding: 35,
                    width: "90%", shadowColor: "#000", shadowOffset: {
                    width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                    <DatePicker
                        mode="calendar"
                        minimumDate={startDate}
                        selected={startedDate}
                        onDateChange={handleChangeStartDate}
                        onSelectedChange={(date)=>setSelectedStartDate(date)}
                        options={{
                            textHeaderColor: "#469ab6",
                            mainColor: "#469ab6",
                            borderColor: "rgba(122, 146, 165, 0.1"
                        }}
                        />
                        <TouchableOpacity onPress={handleOnPressStartDate}>
                            <Text> </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
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
                <View>
                    <TouchableOpacity onPress={handleImageSelection}>  
                        <Image 
                            source={{uri: selectedImage}}
                            style={styles.imageContainer}
                        />
                        <View style={styles.profileImageIcon}>
                             <MaterialIcons name='photo-camera' size={32}/>
                        </View>
                    </TouchableOpacity>
                </View>

                
                <View>
                    <View style={{flexDirection: "column", marginBottom: 6}}>
                        <Text> Name </Text>
                        <View style={{height: 44, width: "100%", borderWidth: 1, borderRadius: 4, marginVertical: 6, justifyContent: "center", paddingLeft: 8}}>
                            <TextInput
                                value={name}
                                onChangeText={value=>setName(value)}
                                editable={true}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "column", marginBottom: 6}}>
                        <Text> Email </Text>
                        <View style={{height: 44, width: "100%", borderWidth: 1, borderRadius: 4, marginVertical: 6, justifyContent: "center", paddingLeft: 8}}>
                            <TextInput
                                value={email}
                                onChangeText={value=>setEmail(value)}
                                editable={true}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "column", marginBottom: 6}}>
                        <Text> Password </Text>
                        <View style={{height: 44, width: "100%", borderWidth: 1, borderRadius: 4, marginVertical: 6, justifyContent: "center", paddingLeft: 8}}>
                            <TextInput
                                value={password}
                                onChangeText={value=>setPassword(value)}
                                editable={true}
                                secureTextEntry
                            />
                        </View> 
                    </View>
                    <View style={{flexDirection: "column", marginBottom: 6}}>
                        <Text> Date or Birth </Text>
                        <TouchableOpacity 
                        onPress={handleOnPressStartDate}
                        style={{height: 44, width: "100%", borderWidth: 1, borderRadius: 4, marginVertical: 6, justifyContent: "center", paddingLeft: 8}}>
                           <Text> {selectedStartDate} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {renderDatePicker()}
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