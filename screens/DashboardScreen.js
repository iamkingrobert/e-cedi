import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { getAuth } from "firebase/auth";
import app, { storage } from "../config/firebase";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import MoneyTransferModal from "../components/UserToUser";
import { getDownloadURL, ref } from "firebase/storage";

export default function DashboardScreen({ route }) {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = getAuth().currentUser.uid;
  const docRef = doc(db, "users", userId);
  const [firstName, setFirstName] = useState();
  const [balance, setBalance] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [userPhoto, setUserPhoto] = useState();
  const [refreshing, setRefreshing] = useState(false);

  // NAVIGATION CONTROL
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.balance) {
      setBalance(route.params.balance);
    }
  }, [route.params]);

  useEffect(() => {
    const getData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);
          setBalance(docSnap.data().balance || 0);

          const user = auth.currentUser;
          if (user && user.photoURL !== null) {
            setUserPhoto(user.photoURL);
          } else {
          }

          const userId = auth.currentUser.uid;
          const storagePath = `images/${userId}`;

          // Retrieve the user's profile photo from Firebase Storage
          const storageRef = ref(storage, storagePath);
          const downloadURL = await getDownloadURL(storageRef);

          // Set the userPhoto state with the download URL
          setUserPhoto(downloadURL);
        }
      } catch (error) {
        // Handle the Promise rejection error here
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [refreshing]);

  // Hide HEADER HERE
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Handler function to open the modal
  const handleSendMoney = () => {
    setOpenModal(true);
  };

  // Refresh App Data
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
      {/* LOGGED-IN USER IMAGE & NAME HERE */}
      <View className="flex-row space-x-[210px] justify-center ">
        <TouchableOpacity onPress={() => navigation.navigate("UserScreen")}>
          <View className="justify-center mt-1">
            <View className="flex-row space-x-1">
              {userPhoto ? (
                <Image
                  source={{ uri: userPhoto }}
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <FontAwesome name="user-circle-o" size={30} color="black" />
              )}

              <Text className="self-center text-[15px] font-semibold">
                Hey {firstName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* NOTIFICATION ICONS HERE BELOW */}
        <View className="items-center justify-center right-1">
          <TouchableOpacity onPress={refreshData}>
            <Ionicons name="refresh-circle" size={27} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* USER ACCOUNT BALANCE */}
      <View className="items-center justify-center">
        <View className=" mt-[39px] bg-black w-[350px] h-32 items-center rounded-[15px]">
          <Text className="text-white text-[17px] pt-5">Total Balance</Text>
          <Text className="text-white text-[18px] pt-4 font-semibold">
            GH₵ {balance.toFixed(2)}
          </Text>
          <Text className="text-white text-[20px]">...</Text>
        </View>
      </View>

      {/* USER PORTFOLIO INTEREST */}
      <View className="mt-6 ml-8 flex-row">
        <Text className="text-black text-[25px] font-medium pl-3">
          {Math.floor((balance / 100) * 0.1)}%
        </Text>
        <Text className=" text-[16px] pl-2 pt-2">Cashflow</Text>
      </View>

      <View className="ml-8">
        <Text className="text-gray-500 text-[15px] pl-3 pt-1">
          {firstName} portfolio growth
        </Text>
      </View>

      {/* ADD MONEY BUTTON*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("TopUpScreen")}
        className="items-center justify-center"
      >
        <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
          <View className="mt-4 ml-5">
            <FontAwesome5 name="money-check" size={25} color="black" />
          </View>
          <Text className=" text-black text-[17px] pl-3 pt-5 ">Top Up</Text>
        </View>
      </TouchableOpacity>

      {/* SEND OR INVEST MONEY*/}
      <Animatable.View
        iterationCount={"infinite"}
        animation={"pulse"}
        easing="ease-in-out"
        className="justify-center mt-9 ml-3"
      >
        <Text className="text-[19px] text-black pl-4">
          Send, invest money on the go
        </Text>
      </Animatable.View>

      {/* SEND MONEY BUTTON*/}
      <TouchableOpacity
        onPress={handleSendMoney}
        className="items-center justify-center"
      >
        <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-4 flex-row ">
          <View className="mt-4 ml-5">
            <Feather name="send" size={25} color="black" />
          </View>
          <Text className=" text-black text-[16px] pl-3 pt-5 ">Send Money</Text>
          <View className="mt-5 ml-[201px] ">
            <Ionicons name="arrow-forward-circle" size={25} color="black" />
          </View>
        </View>

        {/* Money Transfer Modal */}
        <MoneyTransferModal
          visible={openModal} // Pass the visibility state variable to the modal component
          onClose={() => setOpenModal(false)} // Define a function to close the modal
        />
      </TouchableOpacity>

      {/* INVEST MONEY BUTTON*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("Investment")}
        className="items-center justify-center"
      >
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
        onPress={() =>
          navigation.navigate(
            "DashboardScreen",
            alert("e-Cedi Bill Payment Comming Soon")
          )
        }
        className="items-center justify-center"
      >
        <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
          <View className="mt-4 ml-5">
            <FontAwesome name="money" size={25} color="black" />
          </View>
          <Text className=" text-black text-[16px] pl-3 pt-5 ">Pay Bills</Text>
          <Text className=" text-black text-[10px] pl-2 text-center pt-5 ">
            Coming Soon
          </Text>
          <View className="mt-5 ml-[158px] ">
            <Ionicons name="arrow-forward-circle" size={25} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      {/* ATM WITHDRAWAL BUTTON*/}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "DashboardScreen",
            alert("Cash Withdrawal Coming Soon")
          )
        }
        className="items-center justify-center"
      >
        <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-5 flex-row ">
          <View className="mt-4 ml-5">
            <MaterialCommunityIcons
              name="cash-multiple"
              size={25}
              color="black"
            />
          </View>
          <Text className=" text-black text-[16px] pl-3 pt-5 ">
            Cash Withdraw
          </Text>
          <Text className=" text-black text-[10px] pl-2 text-center pt-5 ">
            Coming Soon
          </Text>
          <View className="mt-5 ml-[109px] ">
            <Ionicons name="arrow-forward-circle" size={25} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
