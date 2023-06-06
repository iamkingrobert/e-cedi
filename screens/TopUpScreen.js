import { View, Text, SafeAreaView, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import MTN from '../assets/MTN-Momo.jpeg'
import AirtelTigo from '../assets/airteltigo-money.png'
import Vodafone from '../assets/Vodafone-Cash.jpeg'
import CreditCard from '../assets/eCediCard.jpeg'
import Payment from '../components/Payment';
// import { BottomModal, ModalContent, ModalFooter, ModdalTitle, SlideAnimation } from 'react-native-modals';


export default function TopUpScreen() {

  const [modalVisible, setModalVisible] = useState(false);

  //TRIGGER PAYSTACK MODAL
  const [triggerTransaction, setTriggerTransaction] = useState(false);


    // NAVIGATION CONTROL
    const navigation = useNavigation();

    // TOPUP MODAL CONTROL
    const [showModal, setShowModal] = useState(false);

    // SEND MONEY MODAL CONTROL
    const [openModal, setOpenModal] = useState(false);

    // Hide HEADER HERE
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false,
        })
    }, []);

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
    {/* NOTIFICATION & USER ICONS */}
    <View className="flex-row space-x-[242px] justify-center mt-1">
    <View className="flex-row space-x-1">
    <FontAwesome name="user-circle-o" size={27} color="black" />
    <Text className="pt-1 text-[15px] font-semibold">Hey Robert</Text>
    </View>
    <Ionicons name="notifications" size={27} color="black" />
    </View>

    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="items-center justify-center mt-8">
      <Text className="text-center text-xl font-medium">e-Cedi Wallet Topup</Text>
    </Animatable.View>

     {/*Top-Up Title*/}
     <View  className="mt-12 ml-3 flex-row space-x-1">
        <View className="ml-7">
        <FontAwesome name="arrow-circle-down" size={24} color="black" />
        </View>
          <Text className="text-[14px] text-gray-500 pt-1">Select Mobile Money Vendor</Text>
    </View>

    <View className="flex-row items-center justify-center mt-3 space-x-5">
     {/* MTN BUTTON*/}
     <TouchableOpacity
     //
    onPress={() => setTriggerTransaction(true)} className="items-center justify-center">  
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="mt-2">
    <Image source={MTN} className=" h-[100px] w-[100px] rounded-lg"/>
    </Animatable.View>
    {<Payment setTriggerTransaction={setTriggerTransaction} triggerTransaction={triggerTransaction}/>}
    </TouchableOpacity>

    {/* AIRTELTIGO BUTTON*/}
    <TouchableOpacity
    onPress={() => setShowModal(true)} className="items-center justify-center">  
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="mt-2 border-red-600 border-2 rounded-lg">
    <Image source={AirtelTigo} className=" h-[100px] w-[100px] rounded"/>
    </Animatable.View>
    </TouchableOpacity>

     {/* Vodafone BUTTON*/}
     <TouchableOpacity
    onPress={() => setShowModal(true)} className="items-center justify-center">  
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="mt-2">
    <Image source={Vodafone} className=" h-[100px] w-[100px] rounded-lg"/>
    </Animatable.View>
    </TouchableOpacity>
    </View>

 {/*Top-Up Title*/}
 <View  className="mt-12 ml-3 flex-row space-x-1">
        <View className="ml-7">
        <FontAwesome name="arrow-circle-down" size={24} color="black" />
        </View>
          <Text className="text-[14px] text-gray-500 pt-1">Debit Card Topup</Text>
    </View>


    {/* e-Cedi Credit Card Topup */}
    <TouchableOpacity onPress={() => setShowModal(true)}>
    <View className="items-center justify-center mt-3">
   <Image source={CreditCard} className="relative"/>
   <View className="items-center justify-center absolute top-7 left-12 flex-row space-x-2">
   <View className=" w-7 h-7 bg-white rounded-full">
   <Text className="text-black text-[20px] font-semibold text-center">e</Text>
   </View>
        <Text className="text-white text-[18px] font-semibold">CEDI</Text>
    </View>
    </View>
    </TouchableOpacity>

     {/* CARD TOPUP BUTTON*/}
     <TouchableOpacity
    onPress={() => setShowModal(true)} className="items-center justify-center">  
    <View className="w-[200px] h-[60px] bg-[#fff] border shadow border-black-300 rounded mt-5 flex-row ">
    <View className="mt-4 ml-7">
    <MaterialCommunityIcons name="cash-multiple" size={27} color="black" />
    </View>
    <Text className=" text-black text-[18px] pl-3 pt-5 text-center ">Card Topup</Text>
    <View className="mt-5 ml-[183px]">
    <Ionicons name="arrow-forward-circle" size={25} color="black" />
    </View>
    </View>
    </TouchableOpacity>

    {/* e-Cedi LOGO */}
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="flex-row px-6 mt-[100px] items-center justify-center space-x-1">
        <View className=" w-7 h-7 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-[17px] font-semibold text-center">e</Text>
        </View>
        <Text className="text-black text-[18px] font-semibold">CEDI</Text>
    </Animatable.View>
    {/* <Payment setTriggerTransaction={setTriggerTransaction} triggerTransaction={triggerTransaction}/> */}

    {/* <BottomModal onBackdropPress={()=> setModalVisible(!modalVisible) } swipeDirection={['up', 'down']} swipeThreshold={200} footer={<ModalFooter>
      <Pressable className="pr-10 ml-auto mr-auto mx-10">
      <Text>Top Up</Text>
      </Pressable>
    </ModalFooter>}
    modalTitle={<ModdalTitle title="Load Your Wallet"/>}
    modalAnimation={
      new SlideAnimation({
         slideFrom: 'buttom'
      })
      }
      onHardwareBackPress={() => setModalVisible(!modalVisible)}
      visible={modalVisible}
      onTouchOutside={()=> setModalVisible(!modalVisible)}
    >
    <ModalContent className='w-[100%] h-[280px]'>
    <View>
      <View>

      </View>
    </View>
    </ModalContent>
    </BottomModal> */}
    </SafeAreaView>
   
  )
}