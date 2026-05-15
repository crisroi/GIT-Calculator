import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Display from '../src/components/Display';
import Button from '../src/components/Button';
import { calculate } from '../src/utils/calculate';

const BUTTONS = [
  ['AC', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function App() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const handlePress = (value) => {
    // Clear
    if (value === 'AC') {
      setDisplay('0');
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(false);
      return;
    }

    // Toggle sign
    if (value === '+/-') {
      setDisplay((prev) => String(parseFloat(prev) * -1));
      return;
    }

    // Percentage
    if (value === '%') {
      setDisplay((prev) => String(parseFloat(prev) / 100));
      return;
    }

    // Operators
    if (['÷', '×', '−', '+'].includes(value)) {
      setFirstOperand(parseFloat(display));
      setOperator(value);
      setWaitingForSecond(true);
      return;
    }

    // Equals
    if (value === '=') {
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, parseFloat(display), operator);
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecond(false);
      }
      return;
    }

    // Decimal
    if (value === '.') {
      if (waitingForSecond) {
        setDisplay('0.');
        setWaitingForSecond(false);
        return;
      }
      if (!display.includes('.')) {
        setDisplay((prev) => prev + '.');
      }
      return;
    }

    // Numbers
    if (waitingForSecond) {
      setDisplay(value);
      setWaitingForSecond(false);
    } else {
      setDisplay((prev) => (prev === '0' ? value : prev + value));
    }
  };

  const getButtonType = (value) => {
    if (['÷', '×', '−', '+'].includes(value)) return 'operator';
    if (['AC', '+/-', '%'].includes(value)) return 'function';
    if (value === '=') return 'equals';
    return 'number';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1c1c1e" />
      <View style={styles.container}>
        <Display
          value={display}
          operator={operator}
          hasOperator={waitingForSecond}
        />
        <View style={styles.buttonGrid}>
          {BUTTONS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((btn) => (
                <Button
                  key={btn}
                  label={btn}
                  type={getButtonType(btn)}
                  isWide={btn === '0'}
                  isActive={operator === btn && waitingForSecond}
                  onPress={() => handlePress(btn)}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  buttonGrid: {
    paddingHorizontal: 12,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
});
