import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type BackgroundButtonProps = {
  onPress: () => void;
  title: string;
  additionalBackground: string;
};

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onPress, title, additionalBackground }) => (
  <TouchableOpacity onPress={onPress} style={[styles.authButtonBase, { backgroundColor: additionalBackground }]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

function HomeScreen({ navigation }: {navigation: any}) {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Fistbump</Text>
        </View>
        <View style={styles.sloganContainer}>
            <Text style={styles.sloganText}>Connect in the Real World</Text>
        </View>
        <View style={styles.buttonContainer}>
            <BackgroundButton onPress={() => navigation.navigate('Log In')} title="Log In" additionalBackground='#FEF445'></BackgroundButton>
            <BackgroundButton onPress={() => navigation.navigate('Sign Up')} title="Sign Up" additionalBackground='#F9724D'></BackgroundButton>
        </View>
    </View>
  );
}

function LogInScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Log In</Text>
    </View>
  );
}

function SignUpScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Interstate': require('./assets/Interstate-Regular.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Log In"
          component={LogInScreen} 
          options={{ headerShown: true, headerTintColor: '#372F35', headerTransparent: true, headerTitle: "", headerBackTitle: "Back" }}
        />
        <Stack.Screen 
          name="Sign Up" 
          component={SignUpScreen} 
          options={{ headerShown: true,  headerTintColor: '#372F35', headerTransparent: true, headerTitle: "", headerBackTitle: "Back" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6FB4EB',
        alignItems: 'center',
    },

    titleContainer: {
        marginTop: 135
    },

    titleText: {
        fontSize: 75,
        color: '#372F35',
        fontFamily: 'Interstate',
    },

    sloganContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 125,
     },

    sloganText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#372F35',
        //fontFamily: 'Roobert',
    },

    buttonContainer: {
        flex: 2,
        flexDirection: 'column',
        rowGap: 25,
        marginTop: 40
    },

    authButtonBase: {
        justifyContent: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 90,
        paddingRight: 90,
        borderRadius: 0
    },

    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#372F35'
    }
});