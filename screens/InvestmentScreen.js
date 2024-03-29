import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import GhanaCedi from "../assets/GhanaCedi.png";
import USDICON from "../assets/USDICON.png";
import StarAssurance from "../assets/StarAssurance.png";
import Eco from "../assets/NewEco.jpg";
import GTBank from "../assets/GTBANK.png";
import UBA from "../assets/UBANew.png";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import InvestmentModal from "../components/InvestmentModal";
import { getAuth } from "firebase/auth";
import { app, firestore } from "../config/firebase";
import { doc, getFirestore, updateDoc, getDoc } from "firebase/firestore";

const InvestmentScreen = () => {
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);

  const [investBalance, setInvestBalance] = useState(0);
  const auth = getAuth(app);
  const db = getFirestore();
  const userId = auth.currentUser.uid;
  const userRef = doc(db, "users", userId);

  useEffect(() => {
    // Fetch user's data, including investBalance, when the component mounts
    const fetchUserData = async () => {
      try {
        const userSnapshot = await getDoc(userRef);
        setInvestBalance(userSnapshot.data().investBalance || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Handler function to open the modal
  const handleInvestment = () => {
    setOpenModal(true);
  };

  // Hide HEADER HERE
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
      <TouchableOpacity onPress={() => navigation.navigate("DashboardScreen")}>
        <View className="mx-2">
          <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
        </View>
      </TouchableOpacity>
      <View className="mx-5 mt-2 flex-row space-x-[200px]">
        <Text className="text-start text-[26px] font-semibold">Invest</Text>
        <Animatable.View
          iterationCount={"infinite"}
          animation={"pulse"}
          easing="ease-in-out"
        >
          <Text className="text-center text-gray-500 text-[12px] top-[10px]"></Text>
        </Animatable.View>
      </View>
      <View className="mx-5 mt-[18px] flex-row space-x-2 items-center">
        <Text className="text-start text-[14px] font-medium text-gray-700">
          Investment Balance
        </Text>
        <TouchableOpacity>
          <AntDesign name="eyeo" size={22} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="mx-5 mt-2">
        <Text className="text-[18px] font-medium">
          GH₵ {investBalance.toFixed(2)}
        </Text>
        <Text className="text-[13px] font-light text-blue-700 pt-1">
          portfolio interest
        </Text>
      </View>
      <View className="mx-5 mt-[55px]">
        <Text className="text-[15px]">Create a new investment plan</Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Investment",
            alert("US Dollar Investment Coming Soon")
          )
        }
        className="items-center justify-center"
      >
        <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-8 flex-row ">
          <View className="mt-3 ml-5">
            <Image source={USDICON} className="h-9 w-9" />
          </View>
          <Text className=" text-black text-[16px] pl-2 pt-5 ">
            {" "}
            USD Mutual Funds
          </Text>
          <Text className="text-black text-[10px] pl-2 pt-5 ">Coming Soon</Text>
          <View className="mt-5 ml-[76px] ">
            <Ionicons name="arrow-forward-circle" size={25} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleInvestment}
        className="items-center justify-center"
      >
        <View className="w-[380px] h-[60px] bg-[#fff] border shadow border-gray-100 rounded mt-3 flex-row ">
          <View className="mt-3 ml-5">
            <Image source={GhanaCedi} className="h-9 w-9" />
          </View>
          <Text className=" text-black text-[16px] pl-2 pt-5 ">
            {" "}
            Cedi Mutual Funds
          </Text>
          <View className="mt-5 ml-[148px] ">
            <Ionicons name="arrow-forward-circle" size={25} color="black" />
          </View>
        </View>
        <InvestmentModal
          visible={openModal}
          onClose={() => setOpenModal(false)}
        />
      </TouchableOpacity>
      <View className="mx-5 mt-[35px] items-start">
        <Text className="text-[14px] text-black pt-4">Mutual Funds</Text>
      </View>
      <View className="mx-5 mt-[8px] flex-row space-x-1 items-center">
        <Text className="text-[13px] text-black">Not sure?</Text>
        <Text className="text-[13px] text-blue-500">
          Get our recommended funds
        </Text>
      </View>

      <View className="justify-center space-x-2 flex-row">
        <Animatable.View
          iterationCount={"infinite"}
          animation={"pulse"}
          easing="ease-in-out"
        >
          <TouchableOpacity
            onPress={handleInvestment}
            className="items-center justify-center bg-[#fff] w-[180px] h-[120px] border shadow border-gray-100 rounded-md mt-4"
          >
            <View className="space-x-20 flex-row justify-start">
              <Image
                source={StarAssurance}
                className="h-[45px] w-[45px] bottom-1 rounded-full left-[14px]"
              />
              <View className="flex-col mt-1">
                <Text className="text-green-600 text-center right-3">
                  9.05%
                </Text>
                <Text className="text-gray-600 text-[10px] right-7">
                  Annual Returns
                </Text>
              </View>
            </View>
            <View className="mt-10 bottom-1">
              <Text className=" text-gray-500 text-start text-[12px] ">
                Star Assurance Life Trust Fund
              </Text>
            </View>
            {/* Money Transfer Modal */}
            <InvestmentModal
              visible={openModal}
              onClose={() => setOpenModal(false)}
            />
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          iterationCount={"infinite"}
          animation={"pulse"}
          easing="ease-in-out"
        >
          <TouchableOpacity
            onPress={handleInvestment}
            className="items-center justify-center bg-[#fff] w-[180px] h-[120px] border shadow border-gray-100 rounded-md mt-4"
          >
            <View className="space-x-20 flex-row justify-start">
              <Image
                source={Eco}
                className="h-[45px] w-[45px] top-1 left-[14px] rounded-full"
              />
              <View className="flex-col mt-1">
                <Text className="text-green-600 text-center right-3">6.5%</Text>
                <Text className="text-gray-600 text-[10px] right-7">
                  Annual Returns
                </Text>
              </View>
            </View>
            <View className="mt-10 bottom-1">
              <Text className=" text-gray-500 text-start text-[12px] ">
                EcoBank Limited EDC Mutual Fund
              </Text>
            </View>
            {/* Money Transfer Modal */}
            <InvestmentModal
              visible={openModal}
              onClose={() => setOpenModal(false)}
            />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <View className="flex-row justify-center space-x-2">
        <Animatable.View
          iterationCount={"infinite"}
          animation={"pulse"}
          easing="ease-in-out"
        >
          <TouchableOpacity
            onPress={handleInvestment}
            className="items-center justify-center bg-[#fff] w-[180px] h-[120px] border shadow border-gray-100 rounded-md mt-4"
          >
            <View className="space-x-20 flex-row justify-start">
              <Image
                source={UBA}
                className="h-[45px] w-[45px] rounded-full top-1 left-[14px]"
              />
              <View className="flex-col mt-1">
                <Text className="text-green-600 text-center right-3">
                  8.05%
                </Text>
                <Text className="text-gray-600 text-[10px] right-7">
                  Annual Returns
                </Text>
              </View>
            </View>
            <View className="mt-10 bottom-1">
              <Text className=" text-gray-500 text-start text-[12px] ">
                UBA Entreprenuers Mutual Fund
              </Text>
            </View>
            <InvestmentModal
              visible={openModal}
              onClose={() => setOpenModal(false)}
            />
          </TouchableOpacity>
        </Animatable.View>
        {/* ...... */}
        <Animatable.View
          iterationCount={"infinite"}
          animation={"pulse"}
          easing="ease-in-out"
        >
          <TouchableOpacity
            onPress={handleInvestment}
            className="items-center justify-center bg-[#fff] w-[180px] h-[120px] border shadow border-gray-100 rounded-md mt-4"
          >
            <View className="space-x-20 flex-row justify-start">
              <Image
                source={GTBank}
                className="h-[45px] w-[45px] top-[5px] rounded-full left-[14px]"
              />
              <View className="flex-col mt-1">
                <Text className="text-green-600 text-center right-3">
                  9.05%
                </Text>
                <Text className="text-gray-600 text-[10px] right-7">
                  Annual Returns
                </Text>
              </View>
            </View>
            <View className="mt-10 bottom-1">
              <Text className=" text-gray-500 text-start text-[12px]">
                Guarantee Trust Bank Mutual Fund
              </Text>
            </View>
            <InvestmentModal
              visible={openModal}
              onClose={() => setOpenModal(false)}
            />
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default InvestmentScreen;
