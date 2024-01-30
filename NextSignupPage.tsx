import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';



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

const Dropdown = () => {
    const [selectedValue, setSelectedValue] = useState(null);
  
    const placeholder = {
      label: 'Select a major...',
      value: null,
    };
  
    const options = [
      { label: 'Computer Science', value: 'Computer Science' },
      { label: 'Business', value: 'Business' },
      { label: 'Economics', value: 'Economics' },
      { label: 'Biology', value: 'Biology'}
    ];
  
    return (
      <View>
        <RNPickerSelect
          placeholder={placeholder}
          items={options}
          onValueChange={(value) => setSelectedValue(value)}
          value={selectedValue}
        />
      </View>
    );
  };

  const NextSignupScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{marginLeft: 50, marginTop: 100}}>
                <Text style={styles.inputLabel}> Major </Text>
            </View>
            <View style={styles.input}>
                <Dropdown />
            </View>
       </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
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
        width: 100,
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
        marginLeft: 50
    },

    inputLabel: {
        fontSize: 22.5,
        color: '#372F35',
        marginBottom: 5,
        fontFamily: 'Roobert-Bold',
    }

});

export default NextSignupScreen;