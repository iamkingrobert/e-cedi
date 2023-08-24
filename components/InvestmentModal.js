import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { getAuth } from "firebase/auth";
import { app, firestore } from "../config/firebase";
import * as Animatable from "react-native-animatable";
import { doc, getFirestore, updateDoc, getDoc } from "firebase/firestore";

const InvestmentModal = ({ visible, onClose }) => {
  const [amount, setAmount] = useState("");
  const [transactionComplete, setTransactionComplete] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore();
  const userId = auth.currentUser.uid; // Use auth.currentUser.uid directly
  const userRef = doc(db, "users", userId);

  const handleInvestment = async () => {
    try {
      const investorEmail = auth.currentUser.email;
      const investAmount = parseFloat(amount);

      const userSnapshot = await getDoc(userRef);
      const currentBalance = userSnapshot.data().balance;

      if (currentBalance >= investAmount) {
        const updatedBalance = currentBalance - investAmount;

        // Update User's balance
        await updateDoc(userRef, { balance: updatedBalance });

        // Update User's investBalance (assuming you have a field named investBalance)
        const currentInvestBalance = userSnapshot.data().investBalance || 0;
        const updatedInvestBalance = currentInvestBalance + investAmount;
        await updateDoc(userRef, { investBalance: updatedInvestBalance });

        // Show transaction complete message
        setTransactionComplete(true);

        // Close the modal after a delay
        setTimeout(() => {
          onClose();
          setTransactionComplete(false);
          setAmount("");
        }, 1000);
      } else {
        console.log("Insufficient balance");
      }
    } catch (error) {
      console.error("Error investing:", error);
    }
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
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
        <View className="flex-row space-x-[230px] justify-center items-center">
          <TouchableOpacity
            onPress={handleInvestment}
            className="items-center justify-center"
          >
            <Text className="text-[18px] text-black ">Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="items-center justify-center"
          >
            <Text className="text-[18px] text-gray-500 font-medium">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <Picker // Replace TextInput with Picker
          selectedValue={amount}
          onValueChange={(itemValue) => setAmount(itemValue)}
          style={{
            backgroundColor: "gray-rgb(255,255,255)",
            width: 340,
            borderColor: "gray",
            paddingHorizontal: 10,
            alignSelf: "center",
          }}
        >
          <Picker.Item label="500" value="500" />
          <Picker.Item label="1000" value="1000" />
          <Picker.Item label="2000" value="2000" />
          <Picker.Item label="2500" value="2500" />
          <Picker.Item label="3000" value="3000" />
          <Picker.Item label="3500" value="3500" />
          <Picker.Item label="4000" value="4000" />
          <Picker.Item label="5000" value="5000" />
          {/* Add more options as needed */}
        </Picker>

        {transactionComplete && (
          <Text className="text-center pt-3">Successful</Text>
        )}

        <Animatable.View
          iterationCount={"infinite"}
          animation={""}
          easing="ease-in-out"
          className="flex-row px-6 mt-2 items-center justify-center space-x-1"
        >
          <View className=" w-7 h-7 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-[16px] font-semibold text-center">
              e
            </Text>
          </View>
          <Text className="text-black text-[17px] font-semibold">CEDI</Text>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export default InvestmentModal;
