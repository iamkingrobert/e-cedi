import React, { useEffect, useRef } from "react";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Payment({ triggerTransaction ,setTriggerTransaction}) {
console.log(triggerTransaction);
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

 
  if (triggerTransaction) {
      paystackWebViewRef.current.startTransaction();setTriggerTransaction(false);
    }
  const handleTransaction = () => {
    if (!triggerTransaction) {

      // Trigger the transaction by updating the prop value
      
    }
  };

  return (
    <View style={{ marginHorizontal: 15 }}>
      <Paystack
        paystackKey="pk_test_546acb3eb5aff12d460e41d42f2d3407d7898964"
        paystackSecretKey="sk_test_c37deccc8a74d0397d500c57a768d103e1c62bf1"
        billingEmail="iamkingrobert@gmail.com"
        amount={1}
        billingName="King Robert"
        billingMobile="0547452756"
        currency="GHS"
        channels={["mobile_money"]}
        onCancel={(e) => {
        }}
        onSuccess={(res) => {
        }}
        ref={paystackWebViewRef}
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  paystack: {
    minWidth: "60%",
    backgroundColor: "#F9A826",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  pay: {
    color: "white",
  },
});
