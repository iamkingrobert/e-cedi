import { View, Text, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import BlackStar from '../assets/Star.png'
import app from '../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

//Import getAuth and CreateuserithEmailAndPassword
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';



export default function SignUpScreen() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validationMessage, setValidationMessage] = useState('');

  async function createAccount(){
    email === "" || password === "" ? setValidationMessage("All fields are required")
      : ""
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userId=user.uid
       setDoc(doc(db, "users",userId), {
        firstName,
        lastName,
        tel,
        email,
        password,
      });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      }); 
      
    } catch (error) {
      setValidationMessage(error.message)
    }
}

    // Hide HEADER HERE
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false,
        })
    }, []);

    // NAVIGATIONS ON BUTTON PRESSED
    const onSignInPressed = () => {
      navigation.navigate('SignOnScreen');
  };

const onSignUpPressed  = () => {
  navigation.navigate('SignUpScreen')
};

const onTermsOfUsePressed  = () => {
    navigation.navigate('Terms Of Use Works Fine')
  };

  const onPrivacyPolicyPressed = () => {
    navigation.navigate('Privacy Policy');
  };

  return (
    <SafeAreaView className=" flex-1 relative bg-gray-200  h-[100%]">
      {/* Top Section */}
    <Animatable.View iterationCount={"infinite"} animation={"pulse"} easing="ease-in-out" className="flex-row px-6 mt-12 items-center justify-center space-x-1">
        <View className=" w-10 h-10 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-[28px] font-semibold text-center">e</Text>
        </View>
        <Text className="text-black text-[28px] font-semibold">CEDI</Text>
    </Animatable.View>

    {/* FORM TITLE */}
    <View className="mb-4 mt-36 ml-8">
    <Text className="text-3xl font-semibold">Create Account</Text>
    </View>

    {/* USER SIGNUP FORM */}
    <View className=" mt-2 justify-center items-center">
      <CustomInput 
      placeholder='First name' 
      value={firstName}
      setValue={setFirstName} 
      type="text" 
      className="mt-2"/>

      <CustomInput placeholder='Last name' 
      value={lastName}
      setValue={setLastName} 
      type="text"/>

      <CustomInput 
      placeholder='Tel:' 
      value={tel}
      setValue={setTel} 
      type="text" />

      <CustomInput 
      placeholder='Email' 
      value={email}
      setValue={setEmail} 
      type="email"
      autoCapitalize="none"
      />

      <CustomInput 
      placeholder='Password' 
      value={password}
      setValue={setPassword} 
      secureTextEntry={true} 
      type="password"/>
      <Text className="text-red-700 text-center pt-3">{validationMessage}</Text>
      <Button text='Register' onPress={createAccount}/>
    </View>

    <View className="mt-6 items-center justify-center ">
    

    {/* Terms and Conditions */}
    <View className="mt-5 justify-center items-center ">
    <Text style={Styles.text} onPress={onTermsOfUsePressed}>By registering on e-Cedi, you confirm that you accept our <Text style={Styles.link} onPress={onPrivacyPolicyPressed}>Terms of Use </Text>and <Text style={Styles.link}>Privacy Policy</Text></Text>
    </View>

    {/* CREATE ACCOUNT BUTTON */}
    <Button text="Already have account? Sign In" onPress={onSignInPressed} type='TERTIARY'/>

    </View>
    {/* BlackStar Of Ghana */}
    <View className="mt-[50px] justify-center items-center">
    <Animatable.Image animation={"fadeIn"} easing="ease-in-out" source={BlackStar} className="w-7 h-7 object-cover"/>
    </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({

    text:{
        color: 'black',
        marginHorizontal: 10,
      },
  
  link: {
    color: '#fdb075',
    alignItems: 'center',
      padding: 1,
  }
})