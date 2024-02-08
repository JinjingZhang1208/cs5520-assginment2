import React, { useContext } from 'react';
import { ActivityContext } from '../ActivityContext';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Colors from '../colors';
import { AntDesign } from '@expo/vector-icons';


export default function ActivitiesList({ type }) {
  const { activityArray } = useContext(ActivityContext);

  // Filter the activities based on the type
  const filteredActivities = (type === 'all') ? activityArray : activityArray.filter(activity => activity.special);

  const renderItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.details}>
        <View style={styles.activityNameContainer}>
          <Text style={styles.activityName}>{item.name} {item.special && <AntDesign name="star" size={16} color="yellow" />}</Text>
          
        </View>      
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {`${item.date.toLocaleDateString('en-US', { weekday: 'short' })} ${item.date.toLocaleDateString('en-US', { month: 'short' })} ${item.date.getDate()} ${item.date.getFullYear()}`}
          </Text>
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{`${item.duration} min`}</Text>
        </View>
      </View>
    </View>
  );

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
