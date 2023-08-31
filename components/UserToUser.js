import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { getAuth } from "firebase/auth";
import { app, firestore } from "../config/firebase";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../features/balanceSlice";

import {
  doc,
  getFirestore,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";

const MoneyTransferModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.balance);

  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [transactionComplete, setTransactionComplete] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore();
  const userId = getAuth().currentUser.uid;
  const userRef = doc(db, "users", userId);
  const receiverRef = collection(firestore, "users");
  // const RecieverRef = collection(db, "users");

  const handleTransfer = async () => {
    try {
      const senderEmail = auth.currentUser.email;
      // Convert the amount to a number
      const transferAmount = parseFloat(amount);

      // Fetch sender's current balance
      const userSnapshot = await getDoc(userRef);
      const currentBalance = userSnapshot.data().balance;

      // Update sender's balance
      const updatedSenderBalance = currentBalance - parseFloat(amount);
      await updateDoc(userRef, { balance: updatedSenderBalance });

      // Fetch receiver's current balance
      const q = query(receiverRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const receiverSnapshot = querySnapshot.docs[0];
      const receiverDocRef = doc(db, "users", receiverSnapshot.id);
      const receiverCurrentBalance = receiverSnapshot.data().balance;

      // Update receiver's balance
      const updatedReceiverBalance = receiverCurrentBalance + transferAmount;
      await updateDoc(receiverDocRef, { balance: updatedReceiverBalance });

      // Dispatch the updateBalance action to update Redux state
      dispatch(updateBalance(transferAmount));

      // Show transaction complete message
      setTransactionComplete(true);

      // Close the modal after a delay
      setTimeout(() => {
        onClose();
        setTransactionComplete(false);
        setAmount(""); // Reset the amount input field
        setEmail(""); // Reset the email input field
      }, 1000);
    } catch (error) {
      console.error("Error transferring money:", error);
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
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      ></KeyboardAvoidingView>*/}
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
          <Text className="text-center text-[20px] pb-2">Send Money</Text>
        </View>

        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
          autoFocus={true}
          style={{
            backgroundColor: "gray-rgb(255,255,255)",
            width: 340,
            borderColor: "gray",
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 13,
            paddingHorizontal: 10,
            marginVertical: 5,
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 8,
          }}
        />
        <TextInput
          placeholder="Recipient Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          style={{
            backgroundColor: "gray-rgb(255,255,255)",
            width: 340,
            borderColor: "gray",
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 13,
            paddingHorizontal: 10,
            marginVertical: 5,
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            padding: 15,
            alignItems: "center",
            borderRadius: 10,
            alignSelf: "center",
          }}
          onPress={handleTransfer}
          className="items-center justify-center mt-4 w-[240px]"
        >
          <Text className="text-[18px] text-white font-medium">
            Transfer Money
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          className="items-center justify-center mt-3"
        >
          <Text className="text-[18px] text-gray-500 font-medium">Cancel</Text>
        </TouchableOpacity>

        {transactionComplete && (
          <Text className="text-center">Transaction Complete!</Text>
        )}
      </View>
    </Modal>
  );
};

export default MoneyTransferModal;
