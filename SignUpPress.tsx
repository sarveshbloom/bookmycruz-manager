/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import CustomHeader from './CustomHeader'; // Import your custom header component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation


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



function SignupPress(): React.JSX.Element {
  const navigation = useNavigation(); // Get the navigation object

  const isDarkMode = useColorScheme() === 'dark';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
     
       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
           <CustomHeader/>
        <View style={styles.container}>
          <Text style={styles.title}>Signup</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.signUpText}>
            Want to sign up? <Text style={styles.signUpLink} onPress={handleSignUpPress}>Press here</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    paddingHorizontal: 24,
    backgroundColor:'white',
    paddingBottom:300
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

export default SignupPress;
