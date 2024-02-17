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
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#aaa",
  },
  pressed: {
    opacity: 0.5,
  },
  disabled: {
    backgroundColor: Colors.inactiveBottomBarTab,
  },
});