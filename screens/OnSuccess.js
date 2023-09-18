import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Successful from "../assets/successful.png";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

// Function to generate a random reference number
function generateRandomReferenceNumber(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export default function OnSuccess() {
  const navigation = useNavigation();
  const [referenceNumber, setReferenceNumber] = useState("");

  // Generate the reference number when the component mounts
  useEffect(() => {
    const randomReferenceNumber = generateRandomReferenceNumber(12);
    setReferenceNumber(randomReferenceNumber);
  }, []);

  // Hide HEADER HERE
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View className="top-[20%] justify-center items-center">
      <View className="items-center mt-10">
        <Image source={Successful} className="h-[100px] w-[100px]" />
      </View>
      <View className="mt-5">
        <Text className="text-[20px] text-center text-gray-700">
          Transaction Successful
        </Text>
        <Text className="text-[15px] text-center pt-4 text-gray-800">
          Well done! Your transaction reference:
        </Text>
        <Text className="text-black text-[15px] text-center pt-3">
          {referenceNumber}
        </Text>
      </View>

      <View className="mt-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("DashboardScreen")}
          className="w-[200px] rounded-full bg-black mt-5"
        >
          <Text className="text-white text-[14px] p-4 text-center">
            Return To Dashboard
          </Text>
        </TouchableOpacity>
      </View>

      <Animatable.View
        iterationCount={"infinite"}
        animation={"pulse"}
        easing="ease-in-out"
        className="flex-row px-6 mt-[300px] items-center justify-center space-x-1"
      >
        <View className=" w-6 h-6 bg-black rounded-full items-center justify-center">
          <Text className="text-white text-[14px] font-semibold text-center">
            e
          </Text>
        </View>
        <Text className="text-black text-[16px] font-semibold">CEDI</Text>
      </Animatable.View>
    </View>
  );
}
