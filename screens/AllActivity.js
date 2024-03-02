import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivitiesList from '../components/ActivitiesList'

export default function AllActivity() {
  return (
    <View>
      <ActivitiesList type="all" />
    </View>
  )
}

const styles = StyleSheet.create({})