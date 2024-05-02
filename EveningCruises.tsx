import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import {API_URL} from './config.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation



// Card component for rendering individual items in the list







function EveningCruises() : React.JSX.Element {
  const [cruises, setCruises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const navigation = useNavigation();

  const singleScreen =(cruise)=>{
    console.log("comes here")
    navigation.navigate('SingleCruise', { cruise });
  }

  const CardItem = ({ item, name, imageUri }) => (
    <Card containerStyle={styles.cardContainer}>
      <Card.Image source={{ uri: imageUri || 'https://media.architecturaldigest.com/photos/5654e91c587d37cb3479de02/16:9/w_2560%2Cc_limit/regent-seven-seas-lede.jpg' }} style={styles.cardImage} />
      <Card.Divider />
      <Text style={styles.cardText}>{name}</Text>
      <Text style={styles.cardText}>Price: 600</Text>
      <TouchableOpacity style={styles.cardButton}  onPress={() => singleScreen(item)}>
        <Text style={styles.cardButtonText}>Book</Text>
      </TouchableOpacity>
    </Card>
  );



  useEffect(() => {
    console.log("runs once")
    const getUserToken = async () => {
    const token = await  AsyncStorage.getItem('userToken');
    console.log(token)

    const response = await fetch(`${API_URL}/cruises/list-cruises`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // Add other headers if needed
      },
    });
    const data = await response.json()
    console.log(data)
    setCruises(data.cruises)
    response
    }
    getUserToken();
  },[])


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cruises}
        renderItem={({ item }) => <CardItem item={item} name={item.name} imageUri={item.photo_url} />}
        keyExtractor={(item) => item.id.toString()} // Make sure to convert ID to string for key
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    height: 150,
    borderRadius: 10,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
   
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EveningCruises;