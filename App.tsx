/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import CustomHeader from './CustomHeader'; // Import your custom header component
import LoginScreen from './LoginScreen'; // Import your existing login screen component
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SignupPress from './SignUpPress';
import UploadVerification from './UploadVerification';
import UploadPhoto from './UploadPhoto';
import Home from './Home';
import EveningCruises from './EveningCruises';
import SingleCruise from './SingleCruise';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigationRef = useRef(null);

  const handleLogin = () => {
    // Your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Example: validate username and password, then navigate to the main screen
  };

  const handleSignUpPress = () => {
    // Your logic for navigating to the sign-up screen
    console.log('Sign up pressed');
    // Example: navigate to the sign-up screen
  };

  const backgroundStyle = {
    backgroundColor: 'white',
  };

  useEffect(() => {
   

      const getUserToken = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          if (token !== null) {
            // Token found in AsyncStorage
            if (navigationRef.current) {
              navigationRef.current.navigate('Home'); // Programmatically navigate to 'Home'
            }
          } else {
            // Token not found in AsyncStorage
            console.log('No token found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error retrieving user token:', error);
        }
      };
    
      // Call the function to retrieve user token
      getUserToken();

      console.log("comes here",navigationRef)
     
   // Navigate after 3 seconds (example condition)
  }, []);



  return (
    
    <NavigationContainer ref={navigationRef}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* You can adjust the backgroundColor value as per your requirement */}
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupPress} />
          <Stack.Screen name="UploadVerification" component={UploadVerification} options={{ headerShown: false }} />
          <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="EveningCruises" component={EveningCruises} options={{ headerShown: false }} />
          <Stack.Screen name="SingleCruise" component={SingleCruise} options={{ headerShown: false }} />
          {/* Additional screens can be added here */}
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    paddingHorizontal: 24,
    backgroundColor:'white'
   // Add horizontal padding for better spacing
  },
  title: {
    marginTop:32,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0047ab',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 10,
    fontSize: 16,
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;
