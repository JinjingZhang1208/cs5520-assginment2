import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Colors from '../colors';
import { AntDesign } from '@expo/vector-icons';
import { database } from '../firebase-files/firebaseSetup';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { databse } from '../firebase-files/firebaseSetup';

export default function ActivitiesList({ type }) {
  const navigation = useNavigation();
  const [activityArray, setActivityArray] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'activities'), (querySnapshot) => {
      const activitiesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        activitiesData.push({ id: doc.id, name: data.name, duration: data.duration, date: data.date, special: data.special }); 
      });
      setActivityArray(activitiesData);
    });
  
    return () => unsubscribe();
  }, []);
  
  
  // Filter the activities based on the type
  const filteredActivities = (type === 'all') ? activityArray : activityArray.filter(activity => activity.special === (type === 'special'));

  const handlePress = (activity) => {
    navigation.navigate('Edit', { activity });
  };

  const renderItem = ({ item }) => {
    return (
      <PressableButton onPress={() => handlePress(item)} customStyle={styles.activityItem}>
        <View style={styles.details}>
          <View style={styles.activityNameContainer}>
            <Text style={styles.activityName}>
              {item.name} {item.special && <AntDesign name="star" size={16} color="yellow" />}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {item.date && `${new Date(item.date.seconds * 1000).toLocaleDateString('en-US', { weekday: 'short' })} ${new Date(item.date.seconds * 1000).toLocaleDateString('en-US', { month: 'short' })} ${new Date(item.date.seconds * 1000).getDate()} ${new Date(item.date.seconds * 1000).getFullYear()}`}
            </Text>
          </View>
          <View style={styles.durationContainer}>
            <Text style={styles.duration}>{`${item.duration} min`}</Text>
          </View>
        </View>
      </PressableButton>
    );
  };

  return (
    <FlatList
      data={filteredActivities}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  activityItem: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: "purple",
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 6,
  },
  details: {
    flexDirection: 'row',
  },
  activityNameContainer: {
    flex: 1,
  },
  dateContainer: {
    width: 140,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationContainer: {
    width: 90,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    padding: 10,
  },
  duration: {
    padding: 10,
  },
});
