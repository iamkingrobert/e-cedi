import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
    // Hide HEADER HERE
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false,
        })
    }, []);

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
    <View className="flex-row mt-10">
    
    </View>
   <View className="items-center justify-center">
   <View className=" mt-20 bg-black w-[340px] h-28 items-center rounded-[15px]">
   <Text className="text-white text-[17px] pt-4">Total Balance</Text>
   <Text className="text-white text-[18px] pt-4 font-semibold">1000<Text className="text-[14px] text-gray-50">.00</Text></Text>
   </View>
      
    </View>
    </SafeAreaView>
  )
}