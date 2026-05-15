import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const BUTTON_SIZE = 80;

export default function Button({ label, type, isWide, isActive, onPress }) {
  const getBgColor = () => {
    if (isActive) return '#ffffff';
    if (type === 'operator') return '#ff9f0a';
    if (type === 'equals') return '#ff9f0a';
    if (type === 'function') return '#636366';
    return '#3a3a3c';
  };

  const getTextColor = () => {
    if (isActive) return '#ff9f0a';
    return '#ffffff';
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isWide && styles.wideButton,
        { backgroundColor: getBgColor() },
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wideButton: {
    width: BUTTON_SIZE * 2 + 12,
    paddingLeft: 28,
    alignItems: 'flex-start',
    borderRadius: BUTTON_SIZE / 2,
  },
  label: {
    fontSize: 28,
    fontWeight: '400',
  },
  pressed: {
    opacity: 0.7,
  },
});
