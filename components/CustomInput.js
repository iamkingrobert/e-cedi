import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function CustomInput({value, setValue, placeholder, secureTextEntry, type}) {
  return (
    <View style={styles.container}>
      <TextInput
      value={value} 
      onChangeText={setValue}
      placeholder={placeholder}
      style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 340,
    borderColor: '#111448',
    borderWidth: 0.5,
    borderRadius: 7,
    padding: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {

  },
});