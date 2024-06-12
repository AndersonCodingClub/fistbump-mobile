import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, Image, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Bumper from '../components/Bumper';
import { MaterialIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import DatePicker, { getFormatedDate} from 'react-native-modern-datepicker';

export default function EditProfile ({route, navigation}: {route: any, navigation: any})  {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf')
    });
    
    const [selectedImage, setSelectedImage] = useState('')
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const[newPassword, setNewPassword] = useState("");

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

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
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
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
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

                            <Text style={styles.authButtonBase}> Back </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </View>
            </TouchableWithoutFeedback>
        );
    }
    const { username } = route.params;
    const { name } = route.params;
    const { password } = route.params;
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
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
                <View style={{marginVertical: 22}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={handleImageSelection}>  
                        <Image
                            source={{uri: selectedImage}}
                            style={styles.imageContainer}
                        />
                        <View>
                             <MaterialIcons name='photo-camera' size={32}/>
                        </View>
                    </TouchableOpacity>
                </View>

                
                <View style={{marginLeft: 50}}>
                    <View style={styles.inputHeaderContainer}>
                        <Text style={styles.titleText}> Name </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={newName}
                                onChangeText={value=>setNewName(value)}
                                editable={true}
                                placeholder={name}
                            />
                        </View>
                    </View>
                    <View style={styles.inputHeaderContainer}>
                        <Text style={styles.titleText}> Email </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={newEmail}
                                onChangeText={value=>setNewEmail(value)}
                                editable={true}
                            />
                        </View>
                    </View>
                    <View style={styles.inputHeaderContainer}>
                        <Text style={styles.titleText}> Password </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={newPassword}
                                onChangeText={value=>setNewPassword(value)}
                                editable={true}
                                secureTextEntry
                            />
                        </View> 
                    </View>
                    <View style={styles.inputHeaderContainer}>
                        <Text style={styles.titleText}> Date of Birth </Text>
                        <TouchableOpacity 
                        onPress={handleOnPressStartDate}
                        style={styles.inputContainer}>
                           <Text> {selectedStartDate} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {renderDatePicker()}
            </ScrollView>
        </SafeAreaView>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },

    imageContainer:{
        height: 170,
        width: 170,
        borderRadius: 85,
        borderWidth: 2,
    },

    profileImageIcon: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        zIndex: 9999
    },

    authButtonBase: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        backgroundColor: '#F9724D'
    },

    inputContainer: {
        height: 50, 
        width: 270, 
        borderWidth: 1, 
        borderRadius: 4, 
        marginVertical: 6, 
        justifyContent: "center", 
        paddingLeft: 8,
        backgroundColor: '#BCB4F7',

    },
    
    inputHeaderContainer: {
        flexDirection: "column", 
        marginBottom: 6,
        color: '#372F35',
    },

    titleText: {
        fontFamily: 'Roobert',
        color: '#372F35',
        fontSize: 16,
    },
});