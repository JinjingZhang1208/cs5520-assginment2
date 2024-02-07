import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivitiesList from '../components/ActivitiesList'

export default function AllActivity({navigation}) {
  return (
    <View>
      <ActivitiesList />
    </View>
  )
}

const styles = StyleSheet.create({})