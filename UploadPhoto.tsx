import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image'; // For efficient image rendering
import { API_URL } from './config.js';

function UploadPhoto() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const navigation = useNavigation(); // For navigation
  const backgroundStyle = { backgroundColor: 'white' };

  useEffect(() => {
    const getUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
          getUserDetails(token);
        }
      } catch (error) {
        console.error('Error retrieving user token:', error);
      }
    };

    getUserToken();
  }, []);

  const getUserDetails = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/user-details`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user details');

      const userData = await response.json();
      setName(userData.name); // Store user's name
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSelectDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (!res[0]) throw new Error('Invalid document selected');

      setSelectedImage(res[0]); // Store selected image data
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Document picker was canceled');
      } else {
        console.error('Error selecting document:', error);
      }
    }
  };

  const handleUploadDocument = async () => {
    if (!selectedImage) {
      console.error('No document selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      });

      const response = await fetch(`${API_URL}/auth/upload-photo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload document');

      navigation.navigate('UploadVerification');
      console.log('Document uploaded successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.statusBarOverlay}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => console.log('Logging out')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 100, height: 600 }}>
        <Text style={{ color: 'black', marginBottom: 20 }}>
          Welcome, {name}
        </Text>

        <Text style={{ color: 'black', fontSize: 18, marginBottom: 20 }}>
          Please Upload Your Photo
        </Text>

        <Button title="Select Image" onPress={handleSelectDocument} />

        {selectedImage && (
          <FastImage
            style={{ width: 200, height: 200, marginTop: 20 }}
            source={{ uri: selectedImage.uri }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}

        {selectedImage && (
          <Button title="Upload Image" onPress={handleUploadDocument} style={{ marginTop: 20 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statusBarOverlay: {
    marginTop: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  logoutButton: {
    padding: 5,
  },
  logoutText: {
    color: 'white',
  },
});

export default UploadPhoto;
