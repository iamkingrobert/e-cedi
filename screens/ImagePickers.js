import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, Button, SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { storage } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImagePickerExample() {
  // NAVIGATION CONTROL
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(false);
  const userId = getAuth().currentUser.uid;

  const getPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const source = result.assets[0].uri;
      setImage(source);
    }
  };

  const uploadImage = async () => {
    setProfileImage(true);
    try {
      const response = await fetch(image);
      const blobFile = await response.blob();

      const reference = ref(storage, "images/" + userId);
      const result = await uploadBytes(reference, blobFile);
      const url = await getDownloadURL(result.ref);

      return url;
    } catch (err) {}
  };

  // Hide HEADER HERE
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-white">
      <View className="mx-4">
        <TouchableOpacity onPress={() => navigation.navigate("UserScreen")}>
          <View className="right-1">
            <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center ">
        <Text className="text-[18px] text-black font-semibold">
          PROFILE PHOTO
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View className="mb-5">
          <Button
            title="Pick an image from the camera roll"
            onPress={pickImage}
          />
        </View>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        <TouchableOpacity
          className="mt-7 items-center justify-center"
          onPress={uploadImage}
        >
          <View className="w-[230px] h-[60px] bg-black border shadow border-gray-100 rounded-full mt-4 flex-row justify-center items-center ">
            <Text className="text-[16px] text-white text-center">
              Update Image
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
