import React, { useState } from "react";
import { FormControl, Input, Button, Select } from "native-base";
import { Modal } from "native-base";
import { Image, Text, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";

const SendMoney = ({ openModal, setOpenModal }) => {
  return (
    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Content maxWidth="300px" background="black">
        <Modal.CloseButton />
        <Modal.Header background="white" borderColor="black">
          {/* e-Cedi LOGOS HERE */}
          <Animatable.View
            iterationCount={"infinite"}
            animation={"pulse"}
            easing="ease-in-out"
            className="flex-row px-6 mt-3 items-center justify-center space-x-1"
          >
            <View className=" w-7 h-7 bg-black rounded-full items-center justify-center">
              <Text className="text-white text-[16px] font-semibold text-center">
                e
              </Text>
            </View>
            <Text className="text-black text-[18px] font-semibold">CEDI</Text>
          </Animatable.View>
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <TextInput
              placeholder="Enter Amount"
              placeholderTextColor="white"
              className="text-white text-[13px] border border-white rounded-md p-2"
            />
          </FormControl>
          <FormControl mt="3">
            <TextInput
              placeholder="Enter e-Cedi Email"
              placeholderTextColor="white"
              className="text-white text-[13px] border border-white rounded-md p-2"
            />
          </FormControl>
        </Modal.Body>

        <Modal.Footer
          background="white"
          justifyContent="center"
          alignItems="center"
          borderColor="black"
        >
          <Button.Group>
            <View className="items-center justify-center bg-white">
              <Button
                onPress={() => {
                  setOpenModal(false);
                }}
                background="white"
                width="300px"
              >
                <Text className="text-black text-[16px]">Send Now</Text>
              </Button>
            </View>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default SendMoney;
