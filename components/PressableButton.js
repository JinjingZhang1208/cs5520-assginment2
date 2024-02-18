import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../colors";

export default function PressableButton({
  customStyle,
  onPress,
  disabled,
  children,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled} 
      style={({ pressed }) => [
        styles.defaultStyle,
        customStyle,
        disabled ? styles.disabled : null, 
        pressed && !disabled ? styles.pressed : null,
      ]}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    borderRadius: 5,
    padding: 9,
    backgroundColor: "#aaa",
  },
  pressed: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: Colors.inactiveBottomBarTab,
  },
});