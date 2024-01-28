import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingPage from './LandingPage';
import SignUp from './SignUp';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>{
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="LandingPage" component={LandingPage} />
                <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
          }</NavigationContainer>
    );
}