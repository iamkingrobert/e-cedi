import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import MTN from "../assets/MTN-Momo.jpeg";
import AirtelTigo from "../assets/airteltigo-money.png";
import Vodafone from "../assets/Vodafone-Cash.jpeg";
import CreditCard from "../assets/eCediCard.jpeg";
import Payment from "../components/Payment";
import { MaterialIcons } from "@expo/vector-icons";
import Paystack from "../assets/Paystack.png";
import { TopUpModal } from "../components/TopUpModal";

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
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
      {/* NOTIFICATION & USER ICONS */}
      <View className="flex-row space-x-[275px] justify-center mt-1">
        <TouchableOpacity
          onPress={() => navigation.navigate("DashboardScreen")}
        >
          <View className="mt-2 right-1">
            <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
          </View>
        </TouchableOpacity>
        <View>
          <Image
            source={Paystack}
            className=" h-[50px] w-[50px] rounded-full right-1"
          />
        </View>
      </View>

      <Animatable.View
        iterationCount={"infinite"}
        animation={"pulse"}
        easing="ease-in-out"
        className="items-center justify-center mt-8"
      >
        <Text className="text-center text-xl font-medium">
          e-Cedi Wallet Topup
        </Text>
      </Animatable.View>

      {/*Top-Up Title*/}
      <View className="mt-12  flex-row space-x-1">
        <View className="ml-6">
          <FontAwesome name="arrow-circle-down" size={24} color="black" />
        </View>
        <Text className="text-[14px] text-gray-500 pt-1">
          Select Mobile Money Vendor
        </Text>
      </View>

      <View className="flex-row items-center justify-center mt-3 space-x-5">
        {/* MTN BUTTON*/}
        <TouchableOpacity
          //
          onPress={() => setTriggerTransaction(true)}
          className="items-center justify-center"
        >
          <Animatable.View
            iterationCount={"infinite"}
            animation={"pulse"}
            easing="ease-in-out"
            className="mt-2"
          >
            <Image source={MTN} className=" h-[100px] w-[100px] rounded-lg" />
          </Animatable.View>
          {
            <Payment
              setTriggerTransaction={setTriggerTransaction}
              triggerTransaction={triggerTransaction}
            />
          }
        </TouchableOpacity>

        {/* AIRTELTIGO BUTTON*/}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="items-center justify-center"
        >
          <Animatable.View
            iterationCount={"infinite"}
            animation={"pulse"}
            easing="ease-in-out"
            className="mt-2 border-red-600 border-2 rounded-lg"
          >
            <Image
              source={AirtelTigo}
              className=" h-[100px] w-[100px] rounded"
            />
          </Animatable.View>
        </TouchableOpacity>

        {/* Vodafone BUTTON*/}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="items-center justify-center"
        >
          <Animatable.View
            iterationCount={"infinite"}
            animation={"pulse"}
            easing="ease-in-out"
            className="mt-2"
          >
            <Image
              source={Vodafone}
              className=" h-[100px] w-[100px] rounded-lg"
            />
          </Animatable.View>
        </TouchableOpacity>
      </View>

      {/*Top-Up Title*/}

      <View className="flex-row space-x-[120px] mt-12 ">
        <View className="flex-row space-x-1">
          <View className="ml-7">
            <FontAwesome name="arrow-circle-down" size={24} color="black" />
          </View>
          <Text className="text-[14px] text-black pt-1">Debit Card Topup</Text>
        </View>

        <View className="mt-1">
          <Text className=" text-gray-500 text-[13px] right-2">
            Coming Soon
          </Text>
        </View>
      </View>

      {/* e-Cedi Credit Card Topup */}
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View className="items-center justify-center mt-3">
          <Image source={CreditCard} className="relative" />
          <View className="items-center justify-center absolute top-7 left-12 flex-row space-x-2">
            <View className=" w-7 h-7 bg-white rounded-full">
              <Text className="text-black text-[20px] font-semibold text-center">
                e
              </Text>
            </View>
            <Text className="text-white text-[18px] font-semibold">CEDI</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* CARD TOPUP BUTTON*/}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="items-center justify-center"
      >
        <View className="w-[200px] h-[60px] bg-[#fff] border shadow border-black-300 rounded mt-5 flex-row ">
          <View className="mt-4 ml-7">
            <MaterialCommunityIcons
              name="cash-multiple"
              size={27}
              color="black"
            />
          </View>
          <Text className=" text-black text-[18px] pl-3 pt-5 text-center ">
            Card Topup
          </Text>
          <View className="mt-5 ml-[183px]">
            <Ionicons name="arrow-forward-circle" size={25} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      {/* e-Cedi LOGO */}
      <Animatable.View
        iterationCount={"infinite"}
        animation={"pulse"}
        easing="ease-in-out"
        className="flex-row px-6 mt-[100px] items-center justify-center space-x-1"
      >
        <View className=" w-7 h-7 bg-black rounded-full items-center justify-center">
          <Text className="text-white text-[17px] font-semibold text-center">
            e
          </Text>
        </View>
        <Text className="text-black text-[18px] font-semibold">CEDI</Text>
      </Animatable.View>

      <TopUpModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(amount) => {
          // Here you can handle the top-up logic with the specified amount
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
