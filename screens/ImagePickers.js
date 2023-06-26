import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, Alert, SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { TouchableOpacity } from "react-native";
import { storage } from "../config/firebase";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(false);
  //const userId = getAuth().currentUser.uid;

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
      const source = { uri: result.assets[0].uri };
      setImage(source);
    }
  };

  const uploadImage = async () => {
    setProfileImage(true);
    const fileInfo = await FileSystem.getInfoAsync(image.uri);
    const blob = await FileSystem.readAsStringAsync(fileInfo.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    const storageRef = storage.ref();
    const imageRef = storageRef.child(fileName);

    try {
      const snapshot = await imageRef.putString(blob, "base64");
      const downloadURL = await snapshot.ref.getDownloadURL();

      setProfileImage(false);
      Alert.alert("Photo Upload Successful");
      setImage(null);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error occurred while uploading the image. Please try again."
      );
      setProfileImage(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Button title="Pick an image from the camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <TouchableOpacity
        className="mt-7 items-center justify-center"
        onPress={uploadImage}
      >
        <View>
          <Text className="text-sm text-black">Set Profile Image</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
