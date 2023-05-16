import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'

const Button = ({onPress, text, type='PRIMARY', bgcolor, fgcolor}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`],
    bgcolor ?{backgroundColor: bgcolor} : {}]}
    >
    <Text style={[styles.text, styles[`text_${type}`],
    fgcolor ?{backgroundColor: fgcolor} : {}]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    padding: 13,
    marginVertical: 8,
    marginTop: 22,
    alignItems: 'center',
    borderRadius: 15,
  },
  container_PRIMARY: {
    backgroundColor: 'black',
  },
  container_SECONDARY:{
    borderColor: '#3b71f3',
    borderWidth: 2,
  },
  text_SECONDARY:{
    color: '#3b71f3',
  },
  text:{
    color: '#fff',
    fontWeight: 'bold',
  },
  text_TERTIARY: {
    color: 'black',
  },
  })

export default Button