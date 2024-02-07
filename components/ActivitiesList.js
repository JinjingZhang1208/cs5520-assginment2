import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ActivityContext } from '../ActivityContext';

export default function ActivitiesList() {
  const { activityArray } = useContext(ActivityContext);

  return (
    <View style={styles.container}>
    <Text>Activities List</Text>
    {activityArray.map((activity, index) => (
      <View key={index} style={styles.activityItem}>
        <Text>{activity.name}</Text>
        <Text>{activity.duration}</Text>
        <Text>{activity.date.toLocaleDateString()}</Text>
      </View>
    ))}
  </View>
  )
}

const styles = StyleSheet.create({})