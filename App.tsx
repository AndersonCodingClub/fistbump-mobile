import * as React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './LandingPage';
import LogInPage from './LoginPage';
import SignUpPage from './SignupPage';
import NextSignUpPage from './NextSignupPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={LandingPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Log In"
          component={LogInPage}
          options={{ headerShown: true, headerTintColor: '#372F35', headerTransparent: true, headerTitle: "", headerBackTitle: "Back" }}
        />
        <Stack.Screen 
          name="Sign Up" 
          component={SignUpPage} 
          options={{ headerShown: true,  headerTintColor: '#372F35', headerTransparent: true, headerTitle: "", headerBackTitle: "Back" }}
        />
        <Stack.Screen 
          name="Next Sign Up" 
          component={NextSignUpPage} 
          options={{ headerShown: true,  headerTintColor: '#372F35', headerTransparent: true, headerTitle: "", headerBackTitle: "Back" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}