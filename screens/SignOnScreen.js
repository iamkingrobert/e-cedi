import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import BlackStar from '../assets/Star.png'

export default function SignOnScreen() {

    // Hide HEADER HERE
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false,
        })
    }, []);

    const onSignInPressed = () => {
      navigation.navigate('HomeScreen');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPasswordScreen')
};

const onSignUpPressed  = () => {
  navigation.navigate('SignUpScreen')
};
  return (
    <SafeAreaView className=" flex-1 relative bg-gray-200  h-[100%]">
      {/* Top Section */}
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="flex-row px-6 mt-12 items-center justify-center space-x-1">
        <View className=" w-10 h-10 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-[28px] font-semibold">e</Text>
        </View>
        <Text className="text-black text-[28px] font-semibold">CEDI</Text>
    </Animatable.View>
    <View className="mb-4 mt-44 ml-8">
    <Text className="text-3xl font-semibold">Sign In</Text>
    </View>
    <View className=" mt-2 justify-center items-center">
      <CustomInput placeholder='Enter your email' className="mt-2"/>
      <CustomInput placeholder='Enter your password'/>
    </View>

    <View className="mt-6 items-center justify-center ">
    <Button text='Sign In' onPress={onSignInPressed}/>
    <Button text='Forgot Password?' onPress={onForgotPasswordPressed} type='TERTIARY'/>
    <Button text="Don't have account? Create one" onPress={onSignUpPressed} type='TERTIARY'/>
    </View>
    {/* BlackStar Of Ghana */}
    <View className="mt-[100px] justify-center items-center">
    <Animatable.Image animation={"fadeIn"} easing="ease-in-out" source={BlackStar} className="w-7 h-7 object-cover"/>
    </View>
    </SafeAreaView>
  )
}