import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';

export default function FormCheckbox({ value, setter, text }) {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox isChecked={value} onClick={() => setter(!value)} checkBoxColor='#495e57' style={styles.checkbox} />
      <Text style={styles.checkboxText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  checkbox: {
    width: 40,
    height: 40,
  },
  checkboxText: {
    fontSize: 15,
  },
});
