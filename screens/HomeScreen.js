import { View, Text, Image, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import BlackStar from '../assets/Star.png'



const HomeScreen = () => {
// Hide HEADER HERE
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false,
        })
    }, []);

  return (
    <>
    <SafeAreaView className=" flex-1 relative bg-white  h-[100%]">
    {/* Top Section */}
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="flex-row px-6 mt-12 items-center justify-center space-x-1">
        <View className=" w-10 h-10 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-[28px] font-semibold">e</Text>
        </View>
        <Text className="text-black text-[28px] font-semibold">CEDI</Text>
    </Animatable.View>
    <View className="mt-[150px] space-y-3 px-6">
        <Text className="text-[34px] font-semibold text-center text-[#030514e8]">Build Wealth, the</Text>
        <Text className="text-[34px] font-semibold text-center text-[#05081d]">smart way.</Text>
    </View>
    <View className="mt-12 space-y-3 px-6">
        <Text className="text-[18px] text-gray-700">Save, send and invest money with e-Cedi, the only wealth management app you really need</Text>
    </View>
    {/* BlackStar Of Ghana */}
     <View className="mt-[110px] justify-center items-center flex-row space-x-1">
    <Animatable.Image animation={"fadeIn"} easing="ease-in-out"  source={BlackStar} className="w-5 h-5 object-cover"/>
    <Animatable.Image animation={"fadeIn"} easing="ease-in-out" source={BlackStar} className="w-5 h-5 object-cover"/>
    <Animatable.Image animation={"fadeIn"} easing="ease-in-out" source={BlackStar} className="w-5 h-5 object-cover"/>
    </View>

    {/* SIGN ON / SIGN OFF BUTTONS */}
    <View className="flex-row mt-[150px] items-center justify-center space-x-2">
    <TouchableOpacity
    onPress={() => navigation.navigate("SignOnScreen")}> 
    <View className="w-[150px] h-[45px] bg-[#06071e] items-center justify-center rounded-[20px]">
    <Text className=" text-white text-[15px] text-center">LOG IN</Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity
    onPress={() => navigation.navigate("SignUpScreen")}> 
    <View className="w-[150px] h-[45px] bg-[#06071e] items-center justify-center rounded-[20px] ">
    <Text className=" text-white text-[15px] text-center">SIGN UP</Text>
    </View>
    </TouchableOpacity>
    </View>

     {/* NAVIGATIONS TO DASHBOARD | THIS IS JUST FOR DEVELOPMENT PURPOSE ONLY */}
    {/* Footer Copyright ||| REMOVE THE ONPRESSED ON THE COPYRIGHT WHEN AUTHENTICATION IS COMPLETE*/}
    <TouchableOpacity
    onPress={() => navigation.navigate("DashboardScreen")}> 
    <View className="mt-[76px] space-y-3 px-6 items-center justify-center">
        <Text className="text-[10px] text-gray-700">Developed By King Robert</Text>
    </View>
    </TouchableOpacity>
    </SafeAreaView>
    </>
  )
}

export default HomeScreen