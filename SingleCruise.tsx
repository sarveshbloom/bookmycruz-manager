import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get day name from a date
const getDayName = (date) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[date.getDay()];
};

// Function to get a formatted date string
const getFormattedDate = (date) => {
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
};

// Function to get the next 7 days with formatted date and day name
const getNext7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    days.push({
      date: getFormattedDate(futureDate),
      dayName: getDayName(futureDate),
    });
  }
  return days;
};

// Time slot component to represent individual slots with a selection state
const TimeSlot = ({ time, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.timeSlot, isSelected ? styles.selectedTimeSlot : null]}
      onPress={() => onSelect(time)}
    >
      <Text style={styles.timeSlotText}>{time}</Text>
    </TouchableOpacity>
  );
};

// Card component with time slot section for rendering individual cruise details and booking time
const CardItem = ({ name, imageUri, dateSlots, selectedDay, onSelectDay }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSlotSelect = (time) => {
    setSelectedTime(selectedTime === time ? null : time); // Toggle selection
  };

  const handleDaySelect = (day) => {
    onSelectDay(day); // Handle day selection
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Image
        source={{
          uri: imageUri || 'https://media.architecturaldigest.com/photos/5654e91c587d37cb3479de02/16:9/w_2560%2Cc_limit/regent-seven-seas-lede.jpg',
        }}
        style={styles.cardImage}
      />
      <Card.Divider />
      <Text style={styles.cardText}>{name}</Text>
      <Text style={styles.cardSubheading}>Select Date:</Text>
      <View style={styles.daySlotContainer}>
        {dateSlots.map((slot) => (
          <TouchableOpacity
            key={slot.date}
            style={[
              styles.daySlot,
              selectedDay?.date === slot.date ? styles.selectedDaySlot : null,
            ]}
            onPress={() => handleDaySelect(slot)}
          >
            <Text style={styles.daySlotText}>
              {slot.date}, {slot.dayName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.cardSubheading}>Select Time Slot:</Text>
      <View style={styles.timeSlotContainer}>
        {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'].map((slot) => (
          <TimeSlot
            key={slot}
            time={slot}
            isSelected={slot === selectedTime}
            onSelect={handleTimeSlotSelect}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => {
          if (selectedDay && selectedTime) {
            console.log(`Booking cruise: ${name} on ${selectedDay.date} at ${selectedTime}`);
          } else {
            console.log('Please select a date and time slot for booking.');
          }
        }}
      >
        <Text style={styles.cardButtonText}>Book</Text>
      </TouchableOpacity>
    </Card>
  );
};

function SingleCruise(data, navigation) {
  const [cruise, setCruise] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const cruise = data.route.params?.cruise;
    setCruise(cruise);
    setIsLoading(false);

    const getUserToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    };
    getUserToken();
  }, []);

  const dateSlots = getNext7Days(); // Get next 7 days to show as date slots

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <CardItem
          name={cruise.name}
          imageUri={cruise.photo_url}
          dateSlots={dateSlots}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
      )}
    </SafeAreaView>
  );
}

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
  cardSubheading: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  daySlotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  timeSlot: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  daySlot: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  selectedDaySlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#000',
  },
  daySlotText: {
    fontSize: 14,
    color: '#000',
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

export default SingleCruise;
