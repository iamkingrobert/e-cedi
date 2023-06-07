import { View, Text, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { getAuth } from 'firebase/auth';
import app from '../config/firebase';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";


export default function DashboardScreen({ route }) {

const auth = getAuth(app);
const db = getFirestore(app);
const userId = getAuth().currentUser.uid;
const docRef = doc(db, "users", userId);
const [firstName,setFirstName]=useState()
const [balance,setBalance]=useState(0)


    // NAVIGATION CONTROL
    const navigation = useNavigation();

    useEffect(() => {
      if (route.params && route.params.balance) {
        setBalance(route.params.balance);
      }
    }, [route.params]);
  

      useEffect(()=>{
          const getData=async()=>{
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
      setFirstName( docSnap.data().firstName);   
      setBalance( docSnap.data().balance || 0);  


        } else {
          // docSnap.data() will be undefined in this case
          // console.log("No such document!");
        } 
        }
        getData()
        },[])
    


    // TOPUP MODAL CONTROL
    // const [showModal, setShowModal] = useState(false);

    // SEND MONEY MODAL CONTROL
    // const [openModal, setOpenModal] = useState(false);

    // Hide HEADER HERE
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false,
        })

        
    }, []);

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
    {/* NOTIFICATION & USER ICONS */}
    <TouchableOpacity onPress={() => navigation.navigate("UserScreen")}>
    <View className="flex-row space-x-[242px] justify-center mt-1">
    <View className="flex-row space-x-1">
    <FontAwesome name="user-circle-o" size={27} color="black" />
    <Text className="pt-1 text-[15px] font-semibold">Hey {firstName}</Text>
    </View>
    <Ionicons name="notifications" size={27} color="black" />
    </View>
    </TouchableOpacity>

    {/* USER ACCOUNT BALANCE */}
   <View className="items-center justify-center">
   <View className=" mt-12 bg-black w-[350px] h-32 items-center rounded-[15px]">
   <Text className="text-white text-[17px] pt-5">Total Balance</Text>
   <Text className="text-white text-[18px] pt-4 font-semibold">{balance}<Text className="text-[14px] text-gray-50">.55</Text></Text>
   <Text className="text-white text-[20px]">...</Text>
   </View>
    </View>

    {/* USER PORTFOLIO INTEREST */}
    <View className="mt-6 ml-8">
      <Text className="text-black text-[25px] font-medium pl-3">2.35%</Text>
      <Text className="text-gray-500 text-[15px] pl-3 pt-1">portfolio growth today</Text>
    </View>

     {/* ADD MONEY BUTTON*/}
     <TouchableOpacity
    onPress={() => navigation.navigate("TopUpScreen")} className="items-center justify-center">  
    <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
    <View className="mt-4 ml-5">
    <FontAwesome5 name="money-check" size={25} color="black" />
    </View>
    <Text className=" text-black text-[17px] pl-3 pt-5 ">Add Money</Text>
    </View>
    {/* {showModal &&  <AddMoneyModal setShowModal={setShowModal} showModal={showModal}/>} */}
    </TouchableOpacity>
   

    {/* SEND OR INVEST MONEY*/}
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="justify-center mt-12 ml-3">
      <Text className="text-[19px] text-black pl-4">Send, invest money on the go</Text>
    </Animatable.View>

     {/* SEND MONEY BUTTON*/}
     <TouchableOpacity
    onPress={() => navigation.navigate("TopUpScreen")} className="items-center justify-center">  
    <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
    <View className="mt-4 ml-5">
    <Feather name="send" size={25} color="black" />
    </View>
    <Text className=" text-black text-[16px] pl-3 pt-5 ">Send Money</Text>
    <View className="mt-5 ml-[201px] ">
    <Ionicons name="arrow-forward-circle" size={25} color="black" />
    </View>
    </View>
    </TouchableOpacity>

    {/* INVEST MONEY BUTTON*/}
    <TouchableOpacity
    onPress={() => navigation.navigate("Invest Screen HERE")} className="items-center justify-center">  
    <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
    <View className="mt-4 ml-5">
    <Ionicons name="briefcase-outline" size={24} color="black" />
    </View>
    <Text className=" text-black text-[16px] pl-3 pt-5 ">Invest</Text>
    <View className="mt-5 ml-[250px] ">
    <Ionicons name="arrow-forward-circle" size={25} color="black" />
    </View>
    </View>
    </TouchableOpacity>

    {/* PAY BILLS BUTTON*/}
    <TouchableOpacity
    onPress={() => navigation.navigate("Bill Payment Screen HERE")} className="items-center justify-center">  
    <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
    <View className="mt-4 ml-5">
    <FontAwesome name="money" size={25} color="black" />
    </View>
    <Text className=" text-black text-[16px] pl-3 pt-5 ">Pay Bills</Text>
    <View className="mt-5 ml-[230px] ">
    <Ionicons name="arrow-forward-circle" size={25} color="black" />
    </View>
    </View>
    </TouchableOpacity>

     {/* ATM WITHDRAWAL BUTTON*/}
     <TouchableOpacity
    onPress={() => navigation.navigate("Cash Withdraw Screen HERE")} className="items-center justify-center">  
    <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
    <View className="mt-4 ml-5">
    <MaterialCommunityIcons name="cash-multiple" size={25} color="black" />
    </View>
    <Text className=" text-black text-[16px] pl-3 pt-5 ">Cash Withdraw</Text>
    <View className="mt-5 ml-[183px] ">
    <Ionicons name="arrow-forward-circle" size={25} color="black" />
    </View>
    </View>
    </TouchableOpacity>

    {/* e-Cedi LOGO */}
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="flex-row px-6 mt-14 items-center justify-center space-x-1">
        <View className=" w-7 h-7 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-[16px] font-semibold text-center">e</Text>
        </View>
        <Text className="text-black text-[18px] font-semibold">CEDI</Text>
    </Animatable.View>
    {/* <AddMoneyModal setShowModal={setShowModal} showModal={showModal}/>
    <SendMoney setOpenModal={setOpenModal} openModal={openModal}/> */}
    </SafeAreaView>
  )
}

