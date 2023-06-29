import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import firebase from "../config/firebase";

const MoneyTransferModal = ({ visible, onClose }) => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [transactionComplete, setTransactionComplete] = useState(false);

  const handleTransfer = () => {
    // Update sender's balance
    const senderEmail = firebase.auth().currentUser.email;
    firebase
      .database()
      .ref(`users/${senderEmail}/balance`)
      .transaction(
        (currentBalance) => (currentBalance || 0) - parseFloat(amount)
      );

    // Update receiver's balance
    firebase
      .database()
      .ref(`users/${email}/balance`)
      .transaction(
        (currentBalance) => (currentBalance || 0) + parseFloat(amount)
      );

    // Show transaction complete message
    setTransactionComplete(true);

    // Close the modal after a delay
    setTimeout(() => {
      onClose();
      setTransactionComplete(false);
    }, 2000);
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
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
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
            marginTop: 25,
            marginBottom: 8,
          }}
        />
        <TextInput
          placeholder="Recipient Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          onPress={handleTransfer}
          className="items-center justify-center mt-5"
        >
          <Text className="text-[18px] text-black ">Transfer Money</Text>
        </TouchableOpacity>

        {/* <Button title="Transfer" onPress={handleTransfer} color="black" /> */}

        {/* <Button title="Cancel" onPress={onClose} color="black" /> */}

        <TouchableOpacity
          onPress={onClose}
          className="items-center justify-center mt-3"
        >
          <Text className="text-[18px] text-gray-500 font-medium">Cancel</Text>
        </TouchableOpacity>

        {transactionComplete && <Text>Transaction Complete!</Text>}
      </View>
    </Modal>
  );
};

export default MoneyTransferModal;
