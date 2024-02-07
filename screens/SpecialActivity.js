import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActivitiesList from '../components/ActivitiesList'

export default function SpecialActivity() {
  return (
    <View>
      <ActivitiesList type="special" />
    </View>
  )
}

const styles = StyleSheet.create({})