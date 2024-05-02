import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons.js'; 

import { API_URL } from './config.js';

function Home() {
  const navigation = useNavigation();

  const [userToken, setUserToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const getUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
          setUserToken(token);
          await getUserDetails(token);
        } else {
          console.log('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving user token:', error);
      }
    };

    getUserToken();
  }, []);

  const getUserDetails = async (token: string) => {
    if (!token) {
      console.error('Token is null or undefined.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/user-details`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await response.json();
      console.log('User Details:', userData);
      setName(userData.name);
      return userData;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  const handleButtonPress = (destination: string) => {
    navigation.navigate(destination);
  };

  const handleUploadDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (!res[0]?.uri || !res[0]?.type || !res[0]?.name) {
        throw new Error('Invalid document selected');
      }

      const formData = new FormData();
      formData.append('file', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });

      const response = await fetch(`${API_URL}/auth/upload-photo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }

      navigation.navigate('UploadVerification');
      console.log('Document uploaded successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonRow}>
        <Text>BookMyCruzManager</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Casinos')}>
          <Icon name="sailing" size={30} color="black" />
          <Text>Casinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Cruise')}>
          <Icon name="sailing" size={30} color="black" />
          <Text>Cruise</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('EveningCruises')}>
          <Icon name="sailing" size={30} color="black" />
          <Text>Evening Cruises</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: 'black',
  },
});

export default Home;
