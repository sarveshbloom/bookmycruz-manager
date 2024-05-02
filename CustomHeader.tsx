// Create a new component for your custom header
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Book My Cruz Manager</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white', // Change the background color as needed
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'black', // Change the text color as needed
    fontSize: 18,
  },
});

export default CustomHeader;
