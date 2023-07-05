import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { storage } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default function ImagePickerExample() {
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
      //console.log(source.split("/").pop());
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
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Button title="Pick an image from the camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <TouchableOpacity
        className="mt-7 items-center justify-center"
        onPress={uploadImage}
      >
        <View>
          <Text className="text-sm text-black">Update Profile Image</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
