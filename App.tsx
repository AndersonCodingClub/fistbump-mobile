import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './LandingPage';
import LogInPage from './LoginPage';
import HomePage from './HomePage';
import SignUpPage from './SignupPage';
import NextSignUpPage from './NextSignupPage';

const Stack = createNativeStackNavigator();

export default function App() {
	const [initialRoute, setInitialRoute] = useState('Landing');

	useEffect(() => {
      const checkUserID = async () => {
			const userID = await AsyncStorage.getItem('userID');
			setInitialRoute(userID ? 'Home' : 'Landing');
      	};

      checkUserID();
	}, []);

	return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName={initialRoute}>
		<Stack.Screen 
			name="Landing" 
			component={LandingPage} 
			options={{ headerShown: false }}
		/>
		<Stack.Screen 
			name="Home" 
			component={HomePage} 
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