import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({onPress, title, disabled}) {

  return (
    <TouchableOpacity 
     style={styles.button} 
     onPress={onPress}
     disabled={disabled}
     >
      <Text style={disabled ? styles.disabledText : styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: 'blue',
    fontSize: 20,
  },
  disabledText: {
    color: 'white',
    fontSize: 20,
  }
})