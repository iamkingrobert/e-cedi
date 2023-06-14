import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Text } from "react-native";

export default function ImagePickers({ image, setImage }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Allow access to your camera roll please");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
    }
  };

  const imageView = () => {
    if (image) {
      return (
        <Image
          source={{
            uri: "data:image/jpeg;base64," + image,
          }}
          style={{ height: 30, width: 30, borderRadius: 5 }}
        />
      );
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <TouchableOpacity
        className="items-center justify-center mt-[650px]"
        onPress={pickImage}
      >
        <View className="justify-center items-center bg-black h-12 w-[180px] rounded-[20px]">
          <Text className="text-white text-[20px]">Select Image</Text>
        </View>
        {imageView()}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
