import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { getAuth, signOut } from "firebase/auth";
import app, { storage } from "../config/firebase";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import ImagePickers from "../screens/ImagePickers";
import { getDownloadURL, ref } from "firebase/storage";

export default function UserScreen() {
  // NAVIGATION CONTROL
  const navigation = useNavigation();

  //User Signout Function

  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace("SignOnScreen");
      })
      .catch((error) => alert(error.message));
  };
  const [showImagePicker, setShowImagePicker] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = getAuth().currentUser.uid;
  const docRef = doc(db, "users", userId);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userPhoto, setUserPhoto] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);
          setLastName(docSnap.data().lastName);
          setEmail(docSnap.data().email);

          const user = auth.currentUser;
          if (user && user.photoURL) {
            setUserPhoto(user.photoURL);
          } else {
            // User does not have a photoURL set, you can handle this case accordingly
          }

          const userId = auth.currentUser.uid;
          const storagePath = `images/${userId}`;

          // Retrieve the user's profile photo from Firebase Storage
          const storageRef = ref(storage, storagePath);
          const downloadURL = await getDownloadURL(storageRef);

          // Set the userPhoto state with the download URL
          setUserPhoto(downloadURL);
        }
      } catch (error) {
        // Handle the Promise rejection error here
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // Hide HEADER HERE
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //const handleImageSelection = (selectedImage) => {
  // Do something with the selected image
  // For example, you can upload it to a server or update the user's profile picture
  // console.log(selectedImage);
  // Update the state or perform any necessary actions
  // setShowImagePicker(false);
  // };

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
      <View className="items-center justify-center mt-6">
        <Text className="text-[18px] text-black font-semibold">PROFILE</Text>
      </View>
      <View className="justify-center items-center">
        <View className="mt-10 bg-black w-[350px] h-44 items-center rounded-[15px]">
          <TouchableOpacity
            onPress={() => navigation.navigate("Update Profile")}
          >
            <View className="ml-[310px] pt-1">
              <Feather name="edit" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <View className="items-center justify-center border border-white rounded-full">
            <Image
              source={{ uri: userPhoto }}
              className="h-16 w-16 rounded-full"
            />
          </View>
          <Text className="text-[21px] font-semibold text-white pt-3 ">
            {firstName} {lastName}
          </Text>
          <Text className="text-[14px] font-semibold text-gray-300 pt-2 text-center">
            Email: {email}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("DashboardScreen")}>
        <View className="flex-row mt-20 space-x-3 ml-5">
          <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
            <AntDesign name="appstore-o" size={27} color="white" />
          </View>
          <Text className="text-[22px] pt-3">Dashboard</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <View className="flex-row mt-8 space-x-3 ml-5">
          <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
            <FontAwesome5 name="money-check" size={27} color="white" />
          </View>
          <Text className="text-[22px] pt-1">Transaction History</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <View className="flex-row mt-8 space-x-3 ml-5">
          <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
            <FontAwesome name="line-chart" size={27} color="white" />
          </View>
          <Text className="text-[22px]  pt-3">Portfolio Growth</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("")}>
        <View className="flex-row mt-8 space-x-3 ml-5">
          <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
            <Entypo name="trophy" size={27} color="white" />
          </View>
          <Text className="text-[22px]  pt-3">Rewards</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignout}>
        <View className="flex-row mt-8 space-x-3 ml-6">
          <View className="bg-black h-12 w-12 rounded-full items-center justify-center">
            <Entypo name="log-out" size={27} color="white" />
          </View>
          <Text className="text-[22px]  pt-3">Logout</Text>
        </View>
      </TouchableOpacity>

      {/* e-Cedi LOGO */}
      <Animatable.View
        iterationCount={"infinite"}
        animation={"pulse"}
        easing="ease-in-out"
        className="flex-row px-6 mt-[110px] items-center justify-center space-x-1"
      >
        <View className=" w-7 h-7 bg-black rounded-full items-center justify-center">
          <Text className="text-white text-[16px] font-semibold text-center">
            e
          </Text>
        </View>
        <Text className="text-black text-[18px] font-semibold">CEDI</Text>
      </Animatable.View>
      {
        <ImagePickers
          setShowImagePicker={setShowImagePicker}
          showImagePicker={showImagePicker}
        />
      }
      {/* {showImagePicker && (
        <ImagePickers onImageSelected={handleImageSelection} />
      )} */}
    </SafeAreaView>
  );
}
