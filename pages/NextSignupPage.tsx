import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
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

const SecondDropdown = () => {
    const [selectedValue, setSelectedValue] = useState(null);

    const placeholder = {
      label: 'Select a major...',
      value: null,
    };
  
    const options = [
      { label: 'Computer Science', value: 'Computer Science' },
      { label: 'Business', value: 'Business' },
      { label: 'Economics', value: 'Economics' },
      { label: 'Biology', value: 'Biology' },
    ];
  
    return (
        <RNPickerSelect
          placeholder={placeholder}
          items={options}
          onValueChange={(value) => setSelectedValue(value)}
          value={selectedValue}
        />
    );
};

const NextSignUpScreen = ({navigation}: {navigation: any}) => {
    const [fontsLoaded] = useFonts({
        'Roobert': require('../assets/Roobert-Regular.ttf'),
        'Roobert-Bold': require('../assets/Roobert-Bold.otf'),
    });

    const [age, setAge] = useState('');
    const [role, setRole] = useState(null);

    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };

    const renderMajorDropdown = () => {
        if (role === 'College') {
            return (
                <View>
                    <Text style={styles.inputLabel}>Major</Text>
                    <View style={styles.input}>
                        <SecondDropdown />
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
                  <Text style={styles.inputLabel}>Education</Text>
                  <View style={styles.input}>
                      <FirstDropdown onRoleChange={setRole} />
                  </View>
                  {renderMajorDropdown()}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
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
  }
});

export default NextSignUpScreen;