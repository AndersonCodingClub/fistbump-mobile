import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

type BackgroundButtonProps = {
  onPress: () => void;
  title: string;
  isEnabled: boolean;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, isEnabled }) => (
    <TouchableOpacity onPress={onPress} disabled={!isEnabled} style={[styles.authButtonBase, { backgroundColor: isEnabled ? '#F9724D' : 'lightgray' }]}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const FirstDropdown = ({onRoleChange}: {onRoleChange: any}) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const placeholder = {
        label: 'Select your school type...',
        value: null,
    };

    const options = [
        { label: 'High School', value: 'High School' },
        { label: 'College', value: 'College' },
    ];

    return (
        <RNPickerSelect 
            placeholder={placeholder}
            items={options}
            onValueChange={(value) => {
                setSelectedValue(value);
                onRoleChange(value);
            }}
            value={selectedValue}
        />
    );
};

const SecondDropdown = ({onSecondRoleChange}: {onSecondRoleChange: any}) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const placeholder = {
      label: 'Select a field...',
      value: null,
    };
  
    const options = [
      { label: 'Art', value: 'Art' },
      { label: 'Biology', value: 'Biology' },
      { label: 'Business', value: 'Business' },
      { label: 'Communication', value: 'Communication' },
      { label: 'Computer Science', value: 'Computer Science' },
      { label: 'Economics', value: 'Economics' },
      { label: 'Education', value: 'Education' },
      { label: 'Engineering', value: 'Engineering' },
      { label: 'English', value: 'English' },
      { label: 'Health', value: 'Health' },
      { label: 'Language', value: 'Language' },
      { label: 'Law', value: 'Law' },
      { label: 'Law Enforcement', value: 'Law Enforcement' },
      { label: 'Math', value: 'Math' },
      { label: 'Physics', value: 'Physics' },
      { label: 'Psychology', value: 'Psychology' }
    ];
  
    return (
        <RNPickerSelect
          placeholder={placeholder}
          items={options}
          onValueChange={(value) => {
              setSelectedValue(value);
              onSecondRoleChange(value);
          }}
          value={selectedValue}
        />
    );
};

const NextSignUpScreen = ({route, navigation}: {route: any, navigation: any}) => {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf'),
    });

    const [age, setAge] = useState('');
    const [role, setRole] = useState(null);
    const[secondRole, setSecondRole] = useState(null);
    const isButtonEnabled = age.length > 0 && role !=null && secondRole !=null;
    const { name, username, password } = route.params;

    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };

    const handlePress = () => {
      const major = secondRole === null ? role : secondRole

      if (isButtonEnabled) {
          fetch('http://10.9.150.219:3000/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: name,
                  username: username,
                  password: password,
                  age: age,
                  major: major
              }),
          })
          .then(response => response.json())
          .then(data => {
              if (data.msg === 'SUCCESS') {
                AsyncStorage.setItem('userID', data.userID.toString()).then(() => {
                    navigation.navigate('Home');
                });
              } else {
                  alert('Signup Failed');
              }
          })
          .catch(error => {
              console.error(error);
              alert('Network error');
          });
      }
    };

    const renderFieldDropdown = () => {
        if (role === 'College') {
            return (
                <View>
                    <Text style={styles.inputLabel}>Field</Text>
                    <View style={styles.input}>
                        <SecondDropdown onSecondRoleChange={setSecondRole}/>
                    </View>
                </View>
            );
        }
        return null;
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
              <View style={[styles.subtextContainer, styles.centerContainer]}>
                  <Text style={styles.title}>Sign Up</Text>
              </View>
              <View style={{ marginLeft: 50, marginTop: 30 }}>
                  <Text style={styles.inputLabel}>Age</Text>
                  <TextInput
                      style={styles.input}
                      value={age}
                      onChangeText={setAge}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      keyboardType="number-pad"
                  />
              </View>
              <View style={{ marginLeft: 50 }}>
                  <Text style={[styles.inputLabel]}>Education</Text>
                  <View style={[styles.dropDownButtonBase]}>
                      <FirstDropdown onRoleChange={setRole} />
                  </View> 
                  {renderFieldDropdown()}
              </View>
              <View style={[styles.buttonContainer, styles.centerContainer]}>
                <BackgroundButton onPress={handlePress} title="Sign Up" isEnabled={isButtonEnabled}></BackgroundButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  title: {
    fontSize: 35,
    fontFamily: 'Roobert-Bold',
    color: '#372F35'
  },

  authButtonBase: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 210,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 5
  },

  dropDownButtonBase: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#E6E6E6',

  },

  buttonText: {
    fontSize: 25,
    fontFamily: 'Roobert-Bold',
    textAlign: 'center',
    color: '#372F35'
  },

  input: {
    width: 300,
    height: 60,
    backgroundColor: '#E6E6E6',
    paddingLeft: 20,
    paddingRight: 20,
    color: '#372F35',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  inputLabel: {
    fontSize: 22.5,
    color: '#372F35',
    marginBottom: 15,
    fontFamily: 'Roobert-Bold',
  },
  
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  subtextContainer: {
    marginTop: 120
  },
  
  buttonContainer: {
    marginTop: 45,
  },  
});

export default NextSignUpScreen;