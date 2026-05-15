import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Display({ value, operator, hasOperator }) {
  const formatDisplay = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    if (val.endsWith('.')) return val;
    if (String(num).length > 9) return num.toPrecision(6);
    return val;
  };

  const fontSize = value.length > 9 ? 48 : value.length > 6 ? 64 : 80;

  return (
    <View style={styles.container}>
      {operator && hasOperator && (
        <Text style={styles.operator}>{operator}</Text>
      )}
      <Text
        style={[styles.displayText, { fontSize }]}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {formatDisplay(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    alignItems: 'flex-end',
    minHeight: 140,
    justifyContent: 'flex-end',
  },
  displayText: {
    color: '#ffffff',
    fontWeight: '300',
    letterSpacing: -2,
  },
  operator: {
    fontSize: 28,
    color: '#ff9f0a',
    marginBottom: 4,
    fontWeight: '400',
  },
});
