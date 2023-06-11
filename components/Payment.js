import React, { useEffect, useRef, useState } from "react";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Payment({ triggerTransaction, setTriggerTransaction }) {
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  const [balance, setBalance] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (triggerTransaction) {
      paystackWebViewRef.current.startTransaction();
      setTriggerTransaction(false);
    }
  }, [triggerTransaction]);

  //Fetching Current logged-in User's Email, Name and Phone Number from Firebase and assigning it to paystack billing info down
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        const db = getFirestore();
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();

        setUserEmail(userData.email);
        setUserName(userData.name);
        setUserNumber(userData.number);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  //Fetching User Data at the block of code up

  const amountPaid = 2000; // Set the desired amount here

  const onSuccessTransaction = async (res) => {
    try {
      //console.log("Paystack response:", res);
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;
      const userId = user.uid;
      //console.log(userId);

      // Update the user's balance in the Firestore database
      const userRef = doc(db, "users", userId);
      const newbalance = await getDoc(userRef);
      //console.log(newbalance.data().balance);
      let oldBalance = newbalance.data().balance;

      await updateDoc(userRef, {
        balance: amountPaid + oldBalance,
      });

      //console.log("User balance updated");

      // Fetch the user's document to get the updated balance
      onSnapshot(userRef, (snapshot) => {
        const userData = snapshot.data();
        const updatedBalance = userData.balance;

        // Update the local state with the updated balance
        setBalance(updatedBalance);

        // Pass the updated balance as a prop to the DashboardScreen component
        navigation.navigate("DashboardScreen", { balance: updatedBalance });
      });
    } catch (error) {
      console.error("Error updating user balance:", error);
    }
  };

  return (
    <View style={{ marginHorizontal: 15 }}>
      <Paystack
        paystackKey="pk_test_546acb3eb5aff12d460e41d42f2d3407d7898964"
        paystackSecretKey="sk_test_c37deccc8a74d0397d500c57a768d103e1c62bf1"
        billingEmail={userEmail}
        amount={amountPaid}
        billingName={userName}
        billingMobile={userNumber}
        currency="GHS"
        channels={["mobile_money"]}
        onCancel={(e) => {
          // Handle cancellation here if needed
        }}
        onSuccess={onSuccessTransaction}
        ref={paystackWebViewRef}
      />
    </View>
  );
}
