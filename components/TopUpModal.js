import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export function TopUpModal({ isVisible, onClose, onConfirm }) {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    if (amount && parseFloat(amount) > 0) {
      onConfirm(parseFloat(amount));
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
          padding: 16,
          height: "40%",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Top Up Amount</Text>
        <TextInput
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
        />
        <TouchableOpacity
          onPress={handleConfirm}
          style={{
            backgroundColor: "blue",
            marginTop: 10,
            padding: 10,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
