import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Payment from "./Payment";
import Successful from "../assets/successful.png";
import * as Animatable from "react-native-animatable";

export function TopUpModal({ isVisible, onClose, onConfirm }) {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [topUpSuccessful, setTopUpSuccessful] = useState(false);

  //TRIGGER PAYSTACK MODAL
  const [triggerTransaction, setTriggerTransaction] = useState(false);

  const handleConfirm = () => {
    isVisible = false;
    setTriggerTransaction(true);

    // Close the modal after a delay
    setTimeout(() => {
      setEnteredAmount("");
      setTopUpSuccessful(true);
    }, 5000);

    // if (enteredAmount && parseFloat(enteredAmount) > 0) {
    //   onConfirm(parseFloat(enteredAmount));
    // }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
    >
      {/* New Changes Here */}
      {topUpSuccessful ? (
        <View className="items-center justify-center">
          <Animatable.View
            iterationCount={"infinite"}
            animation={"pulse"}
            easing="ease-in-out"
            className="flex-row space-x-1 justify-center items-center"
          >
            <View>
              <Image source={Successful} className="h-8 w-8" />
            </View>
            <Text className="text-center text-[16px] font-medium">
              Top Up Successful
            </Text>
          </Animatable.View>
        </View>
      ) : (
        <>
          {/* OLD COMPONENT */}
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingTop: 14,
              height: "40%",
            }}
          >
            <View className="items-center justify-center">
              <Text className="text-center text-[20px] pb-6">Enter Amount</Text>
            </View>

            <TextInput
              autoCapitalize="none"
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={enteredAmount}
              autoFocus={true}
              onChangeText={(text) => setEnteredAmount(text)}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 10,
                width: 340,
                padding: 10,
                marginTop: 10,
                alignSelf: "center",
              }}
            />
            <TouchableOpacity
              onPress={handleConfirm}
              style={{
                backgroundColor: "black",
                marginTop: 20,
                padding: 15,
                alignItems: "center",
                borderRadius: 10,
                alignSelf: "center",
              }}
              className="items-center justify-center w-[200px] rounded-full"
            >
              <Text className="text-[18px] text-white">Top Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              className="items-center justify-center mt-3"
            >
              <Text className="text-[18px] text-gray-500 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {
        <Payment
          setTriggerTransaction={setTriggerTransaction}
          triggerTransaction={triggerTransaction}
        />
      }
    </Modal>
  );
}
