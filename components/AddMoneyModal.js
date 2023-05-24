import React, { useState } from 'react';
import { FormControl, Input, Button, Select } from 'native-base';
import { Modal,  } from 'native-base';
import {  Image, Text, TextInput, View } from 'react-native';
import MTN from '../assets/mtn.webp'
import AirtelTigo from '../assets/AirtelTigo.png'
import Vodafone from '../assets/Vodafone.png'

const AddMoneyModal = ({ showModal, setShowModal }) =>{
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <Modal.Content maxWidth="300px" background="black" >
      <Modal.CloseButton/>
      <Modal.Header background="black" borderColor="black">
        {/* ADD LOGOS HERE */}
        <View className="flex-row justify-center items-center space-x-1">
    <Image source={MTN} className="w-[60px] h-[60px]"/>
    <Image source={AirtelTigo} className="w-[50px] h-[50px]"/>
    <Image source={Vodafone} className="w-[60px] h-[60px]"/>
        </View>
      </Modal.Header>
      <Modal.Body>
        <FormControl>
          {/* <FormControl.Label><Text className="text-white">Momo Vendor:</Text></FormControl.Label> */}
          <TextInput placeholder='Enter Amount' placeholderTextColor="white" className="text-white text-[13px] border border-white rounded-md p-2"/>
        </FormControl>
        <FormControl mt="3">
          {/* <FormControl.Label><Text className="text-white">Number</Text></FormControl.Label> */}
          <TextInput placeholder='Momo Number' placeholderTextColor="white" className="text-white text-[13px] border border-white rounded-md p-2"/>
        </FormControl>
      </Modal.Body>
      
      <Modal.Footer background="white" justifyContent="center" alignItems="center" borderColor="black">
        <Button.Group  >
          <View className="items-center justify-center bg-white">
          <Button onPress={() => {
          setShowModal(false);
        }} background="white" width="300px">
            <Text className="text-black text-[15px]">Top Up Now</Text>
          </Button>
          </View>
        </Button.Group>
        </Modal.Footer>
    </Modal.Content>
  </Modal>
  );

};

export default AddMoneyModal