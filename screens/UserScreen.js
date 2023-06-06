import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function UserScreen() {
    // NAVIGATION CONTROL
    const navigation = useNavigation();

     // Hide HEADER HERE
     useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false,
        })
    }, []);
  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
    <View className="items-center justify-center mt-6">
        <Text className="text-[18px] text-black font-semibold">PROFILE</Text>
    </View>
    <View className="justify-center items-center">
    <View className="mt-10 bg-black w-[350px] h-36 items-center rounded-[15px]">
    <View className="mt-5">
    <FontAwesome name="user-circle-o" size={40} color="white"/>
    </View>
    <Text className="text-[18px] font-semibold text-white pt-4">King Robert</Text>
    <Text className="text-[13px] font-semibold text-white pt-2">iamkingrobert@gmail.com</Text>
    </View>
    </View>
    <View className="flex-row mt-16 space-x-3 ml-5">
    <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
    <AntDesign name="appstore-o" size={27} color="white" />
    </View>
    <Text className="text-[22px] pt-3">Dashboard</Text>
    </View>

    <View className="flex-row mt-8 space-x-3 ml-5">
    <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
    <FontAwesome5 name="money-check" size={27} color="white" />
    </View>
    <Text className="text-[22px] pt-1">Transaction History</Text>
    </View>

    <View className="flex-row mt-8 space-x-3 ml-5">
    <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
    <Entypo name="trophy" size={27} color="white" />
    </View>
    <Text className="text-[22px]  pt-3">Rewards</Text>
    </View>

    <TouchableOpacity>
    <View className="flex-row mt-8 space-x-3 ml-6">
    <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
    <Entypo name="log-out" size={27} color="white" />
    </View>
    <Text className="text-[22px]  pt-3">Logout</Text>
    </View>
    </TouchableOpacity>

    {/* e-Cedi LOGO */}
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="flex-row px-6 mt-[230px] items-center justify-center space-x-1">
        <View className=" w-7 h-7 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-[16px] font-semibold text-center">e</Text>
        </View>
        <Text className="text-black text-[18px] font-semibold">CEDI</Text>
    </Animatable.View>
    </SafeAreaView>
  )
}