import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Payment from "./Payment";

export function TopUpModal({ isVisible, onClose, onConfirm }) {
  const [enteredAmount, setEnteredAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    if (enteredAmount && parseFloat(enteredAmount) > 0) {
      onConfirm(parseFloat(enteredAmount));
    }
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
          className="items-center justify-center w-[240px]"
        >
          <Text className="text-[18px] text-white font-medium">Top Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          className="items-center justify-center mt-3"
        >
          <Text className="text-[18px] text-gray-500 font-medium">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
